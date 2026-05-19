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

function currency(c) {
  return c === '₡' ? 'CRC' : 'USD';
}

export async function generateMetadata({ params }) {
  const sb = createSupabaseClient();
  const { data: item } = await sb.from('listings').select('title,description,photos,sector,business_type,operation,location,currency,price,provincia,canton,distrito').eq('id', params.id).single();
  if (!item) return { title: 'Negocio · AyS' };

  const typeLabel = item.business_type || item.sector || 'Negocio';
  const loc = item.location ? ` en ${item.location}` : '';
  const op = item.operation || 'venta';
  const title = `${typeLabel} en ${op}${loc} — ${item.currency || '$'}${fmtPrice(item.price)} | AyS`;
  const seoText = await generateSEOText(item);
  const desc = seoText.slice(0, 155)
    || (item.description || '').slice(0, 155)
    || `${typeLabel} en ${op}${loc}. Precio: ${item.currency || '$'}${fmtPrice(item.price)}`;
  const img = item.photos?.[0] || '';

  return {
    title,
    description: desc,
    openGraph: { title, description: desc, images: img ? [{ url: img }] : [], type: 'website', siteName: 'AyS Soluciones Comerciales' },
    twitter: { card: 'summary_large_image', title, description: desc, images: img ? [img] : [] },
  };
}

export default async function NegocioPage({ params }) {
  const sb = createSupabaseClient();
  const { data: item } = await sb.from('listings').select('*').eq('id', params.id).single();
  if (!item) notFound();

  const seoText = await generateSEOText(item);

  const photos = item.photos || [];

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: item.title,
    description: item.description || undefined,
    url: `https://ays.homes/negocio/${params.id}`,
    image: photos[0] ? [photos[0]] : undefined,
    offers: {
      '@type': 'Offer',
      price: item.price,
      priceCurrency: currency(item.currency),
    },
    ...(item.location ? { address: { '@type': 'PostalAddress', addressLocality: item.canton || item.location, addressRegion: item.provincia, addressCountry: 'CR' } } : {}),
  };

  return (
    <PageLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="det-page">
        <Lightbox photos={photos} />
        {item.operation && (
          <div className="det-badge">
            <span className="badge b-sale">{item.operation}</span>
          </div>
        )}
        <div className="det-layout">
          <div>
            <p className="det-type">
              {item.sector || 'Negocio'}{item.business_type ? ' · ' + item.business_type : ''}
            </p>
            <h1 className="det-title">{item.title}</h1>
            {item.location && <p className="det-loc"><i className="fas fa-location-dot" /> {item.location}</p>}
            <p className="det-price">{item.currency || '$'}{fmtPrice(item.price)}</p>

            {(item.income_approx || item.sale_reason || item.includes) && (
              <div className="ibox">
                <h3>Información del negocio</h3>
                <div className="specs-row" style={{ gridTemplateColumns: 'repeat(2,1fr)' }}>
                  {item.income_approx && (
                    <div className="spec-i">
                      <i className="fas fa-chart-line" />
                      <span className="sv" style={{ fontSize:14 }}>{item.income_approx}</span>
                      <span className="sl">Ingresos aprox.</span>
                    </div>
                  )}
                  {item.operation && (
                    <div className="spec-i">
                      <i className="fas fa-handshake" />
                      <span className="sv" style={{ fontSize:14 }}>{item.operation}</span>
                      <span className="sl">Tipo de operación</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {item.description && (
              <div className="ibox">
                <h3>Descripción</h3>
                <p style={{ fontSize:'14.5px', color:'var(--teal)', lineHeight:1.75 }}>{item.description}</p>
              </div>
            )}

            {item.includes && (
              <div className="ibox">
                <h3>¿Qué incluye la venta?</h3>
                <p style={{ fontSize:'14.5px', lineHeight:1.75 }}>{item.includes}</p>
              </div>
            )}

            {item.sale_reason && (
              <div className="ibox">
                <h3>Motivo de venta</h3>
                <p style={{ fontSize:'14.5px', color:'var(--muted)', lineHeight:1.75 }}>{item.sale_reason}</p>
              </div>
            )}

            {item.amenidades?.length > 0 && (
              <div className="ibox">
                <h3>Extras</h3>
                <div className="am-grid">
                  {item.amenidades.map((a) => (
                    <div className="amrow" key={a}><i className="fas fa-check-circle" /> {a}</div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <DetailContactForm item={{ ...item, kind: 'business' }} />
        </div>
        {seoText && (
          <div className="ibox" style={{ marginTop: '2rem' }}>
            <h3>Encontrá más negocios similares</h3>
            <p className="text-sm text-gray-500" style={{ fontSize: '0.8rem', color: '#9ca3af', lineHeight: 1.7 }}>{seoText}</p>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
