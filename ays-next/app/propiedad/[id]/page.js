import { notFound } from 'next/navigation';
import { createSupabaseClient } from '@/lib/supabase';
import { generateSEOText } from '@/lib/gemini';
import PageLayout from '@/components/PageLayout';
import Lightbox from '@/components/Lightbox';
import DetailContactForm from '@/components/DetailContactForm';

function fmtPrice(p) {
  const n = parseFloat(String(p || '').replace(/[^0-9.]/g, ''));
  return isNaN(n) ? p || '' : n.toLocaleString('es-CR');
}

function hasValue(v) {
  return v !== null && v !== undefined && String(v).trim() !== '';
}

function operationType(item) {
  return String(item.operation_type || item.operation || 'Venta').trim();
}

function isSaleAndRent(item) {
  return String(item.operation_type || '').trim() === 'Venta y Alquiler';
}

function currency(c) { return c === '₡' ? 'CRC' : 'USD'; }

export async function generateMetadata({ params }) {
  const sb = createSupabaseClient();
  const { data: item } = await sb.from('listings').select('title,description,photos,prop_type,operation,operation_type,location,currency,price,sale_price,rent_price,provincia,canton,distrito,beds,baths,area').eq('id', params.id).single();
  if (!item) return { title: 'Propiedad · AyS' };

  const loc = [item.distrito, item.canton, item.provincia].filter(Boolean).join(', ') || item.location || 'Costa Rica';
  const op = operationType(item);
  const title = `${item.prop_type || 'Propiedad'} en ${op || 'venta'} en ${loc} — ${item.currency || '$'}${fmtPrice(item.price)} | AyS`;
  const seoText = await generateSEOText(item);
  const desc = seoText.slice(0, 155)
    || (item.description || '').slice(0, 155)
    || `${item.prop_type || 'Propiedad'} en ${op || 'venta'} en ${loc}. Precio: ${item.currency || '$'}${fmtPrice(item.price)}`;
  const img = item.photos?.[0] || '';

  return {
    title,
    description: desc,
    openGraph: { title, description: desc, images: img ? [{ url: img }] : [], type: 'website', siteName: 'AyS Soluciones Comerciales' },
    twitter: { card: 'summary_large_image', title, description: desc, images: img ? [img] : [] },
  };
}

export default async function PropiedadPage({ params }) {
  const sb = createSupabaseClient();
  const { data: item } = await sb.from('listings').select('*').eq('id', params.id).single();
  if (!item) notFound();

  const seoText = await generateSEOText(item);
  console.log('[propiedad] seoText generado:', seoText);

  const photos = item.photos || [];
  const operation = operationType(item);
  const isSaleRent = isSaleAndRent(item);
  const salePrice = hasValue(item.sale_price) ? item.sale_price : item.price;
  const rentPrice = item.rent_price;
  const opClass = operation.indexOf('Alquiler') === 0 ? 'b-rent' : 'b-sale';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: item.title,
    description: item.description || undefined,
    url: `https://ays.homes/propiedad/${params.id}`,
    image: photos[0] ? [photos[0]] : undefined,
    offers: { '@type': 'Offer', price: item.price, priceCurrency: currency(item.currency) },
    address: { '@type': 'PostalAddress', addressLocality: item.canton || item.location, addressRegion: item.provincia, addressCountry: 'CR' },
  };

  return (
    <PageLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="det-page">
        <Lightbox photos={photos} />
        {photos.length > 0 && (
          <div className="det-badge">
            <span className={`badge ${opClass}`}>{isSaleRent ? 'Venta/Alquiler' : operation}</span>
          </div>
        )}
        <div className="det-layout">
          <div>
            <p className="det-type">{item.prop_type || 'Propiedad'}</p>
            <h1 className="det-title">{item.title}</h1>
            {item.location && <p className="det-loc"><i className="fas fa-location-dot" /> {item.location}</p>}
            {isSaleRent ? (
              <div className="det-price" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {hasValue(salePrice) && <div>Venta: {item.currency || '$'}{fmtPrice(salePrice)}</div>}
                {hasValue(rentPrice) && <div>Alquiler: {item.currency || '$'}{fmtPrice(rentPrice)} <span>/mes</span></div>}
              </div>
            ) : (
              <p className="det-price">
                {item.currency || '$'}{fmtPrice(item.price)}
                {operation.indexOf('Alquiler') === 0 && <span>/mes</span>}
              </p>
            )}

            {(item.beds || item.baths || item.area || item.parking) && (
              <div className="ibox">
                <h3>Características</h3>
                <div className="specs-row">
                  {item.beds && <div className="spec-i"><i className="fas fa-bed" /><span className="sv">{item.beds}</span><span className="sl">Habitaciones</span></div>}
                  {item.baths && <div className="spec-i"><i className="fas fa-bath" /><span className="sv">{item.baths}</span><span className="sl">Baños</span></div>}
                  {item.area && <div className="spec-i"><i className="fas fa-expand-arrows-alt" /><span className="sv">{item.area} m²</span><span className="sl">Área</span></div>}
                  {item.parking && <div className="spec-i"><i className="fas fa-car" /><span className="sv">{item.parking}</span><span className="sl">Parqueos</span></div>}
                </div>
              </div>
            )}

            {item.description && (
              <div className="ibox">
                <h3>Descripción</h3>
                <p style={{ fontSize: '14.5px', color: 'var(--teal)', lineHeight: 1.75 }}>{item.description}</p>
              </div>
            )}

            {item.finance_notes && (
              <div className="ibox">
                <h3>Notas financieras</h3>
                <p style={{ fontSize: '14.5px', lineHeight: 1.75 }}>{item.finance_notes}</p>
              </div>
            )}

            {item.amenidades?.length > 0 && (
              <div className="ibox">
                <h3>Amenidades</h3>
                <div className="am-grid">
                  {item.amenidades.map((a) => (
                    <div className="amrow" key={a}><i className="fas fa-check-circle" /> {a}</div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <DetailContactForm item={item} />
        </div>
        {seoText && (
          <div className="ibox" style={{ marginTop: '2rem' }}>
            <h3>Encontrá más propiedades similares</h3>
            <p className="text-sm text-gray-500" style={{ fontSize: '0.8rem', color: '#9ca3af', lineHeight: 1.7 }}>{seoText}</p>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
