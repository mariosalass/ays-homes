import { createSupabaseClient } from '@/lib/supabase';
import PageLayout from '@/components/PageLayout';
import Lightbox from '@/components/Lightbox';
import DetailContactForm from '@/components/DetailContactForm';

function fmtPrice(p) {
  const n = parseFloat(String(p || '').replace(/[^0-9.]/g, ''));
  return isNaN(n) ? p || '' : n.toLocaleString('es-CR');
}

function currency(c) { return c === '₡' ? 'CRC' : 'USD'; }

export async function generateMetadata({ params }) {
  const sb = createSupabaseClient();
  const { data: item } = await sb.from('listings').select('title,description,photos,brand,model,year,currency,price').eq('id', params.id).single();
  if (!item) return { title: 'Vehículo · AyS' };

  const model = item.title || item.brand || 'Vehículo';
  const title = `${item.brand ? item.brand + ' ' : ''}${model}${item.year ? ' ' + item.year : ''} en venta — ${item.currency || '$'}${fmtPrice(item.price)} | AyS`;
  const desc = (item.description || '').slice(0, 155)
    || `${item.brand || 'Auto'} ${model}${item.year ? ' ' + item.year : ''} en venta. Precio: ${item.currency || '$'}${fmtPrice(item.price)}`;
  const img = item.photos?.[0] || '';

  return {
    title,
    description: desc,
    openGraph: { title, description: desc, images: img ? [{ url: img }] : [], type: 'website', siteName: 'AyS Soluciones Comerciales' },
    twitter: { card: 'summary_large_image', title, description: desc, images: img ? [img] : [] },
  };
}

export default async function VehiculoPage({ params }) {
  const sb = createSupabaseClient();
  const { data: item } = await sb.from('listings').select('*').eq('id', params.id).single();
  if (!item) return (
    <PageLayout>
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.2rem', textAlign: 'center', padding: '3rem' }}>
        <i className="fas fa-car-burst" style={{ fontSize: '3rem', color: '#cbd5e1' }} />
        <h1 style={{ fontSize: '1.6rem', fontWeight: 700 }}>Esta publicación ya no está disponible</h1>
        <p style={{ color: '#64748b' }}>Es posible que haya sido eliminada o que el enlace sea incorrecto.</p>
        <a href="/" style={{ background: 'var(--teal)', color: '#fff', padding: '12px 28px', borderRadius: '10px', fontWeight: 600, textDecoration: 'none' }}>Volver al inicio</a>
      </div>
    </PageLayout>
  );

  const photos = item.photos || [];

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Vehicle',
    name: item.title,
    description: item.description || undefined,
    url: `https://ays.homes/vehiculo/${params.id}`,
    image: photos[0] ? [photos[0]] : undefined,
    brand: item.brand ? { '@type': 'Brand', name: item.brand } : undefined,
    vehicleModelDate: item.year || undefined,
    mileageFromOdometer: item.km ? { '@type': 'QuantitativeValue', value: item.km } : undefined,
    offers: { '@type': 'Offer', price: item.price, priceCurrency: currency(item.currency) },
  };

  return (
    <PageLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="det-page">
        <Lightbox photos={photos} />
        {item.year && (
          <div className="det-badge">
            <span className="badge b-yr">{item.year}</span>
          </div>
        )}
        <div className="det-layout">
          <div>
            <p className="det-type">{item.brand || 'Auto'}</p>
            <h1 className="det-title">{item.title}</h1>
            <p className="det-price">{item.currency || '$'}{fmtPrice(item.price)}</p>

            {(item.km || item.transmission || item.fuel || item.color || item.engine) && (
              <div className="ibox">
                <h3>Especificaciones</h3>
                <div className="specs-row">
                  {item.km && <div className="spec-i"><i className="fas fa-tachometer-alt" /><span className="sv">{item.km}</span><span className="sl">Kilometraje</span></div>}
                  {item.transmission && <div className="spec-i"><i className="fas fa-cog" /><span className="sv">{item.transmission}</span><span className="sl">Transmisión</span></div>}
                  {item.fuel && <div className="spec-i"><i className="fas fa-gas-pump" /><span className="sv">{item.fuel}</span><span className="sl">Combustible</span></div>}
                  {item.color && <div className="spec-i"><i className="fas fa-palette" /><span className="sv">{item.color}</span><span className="sl">Color</span></div>}
                  {item.engine && <div className="spec-i"><i className="fas fa-gauge" /><span className="sv">{item.engine}</span><span className="sl">Cilindrada</span></div>}
                </div>
              </div>
            )}

            {item.description && (
              <div className="ibox">
                <h3>Descripción</h3>
                <p style={{ fontSize: '14.5px', color: 'var(--teal)', lineHeight: 1.75 }}>{item.description}</p>
              </div>
            )}

            {item.amenidades?.length > 0 && (
              <div className="ibox">
                <h3>Extras y equipamiento</h3>
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
      </div>
    </PageLayout>
  );
}
