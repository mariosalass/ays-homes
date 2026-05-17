import { notFound } from 'next/navigation';
import { createSupabaseClient } from '@/lib/supabase';
import PageLayout from '@/components/PageLayout';
import Lightbox from '@/components/Lightbox';
import DetailContactForm from '@/components/DetailContactForm';

function fmtPrice(p) {
  const n = parseFloat(String(p || '').replace(/[^0-9.]/g, ''));
  return isNaN(n) ? p || '' : n.toLocaleString('es-CR');
}

export async function generateMetadata({ params }) {
  const sb = createSupabaseClient();
  const { data: item } = await sb.from('listings').select('title,description,photos,prop_type,operation,location,currency,price').eq('id', params.id).single();
  if (!item) return { title: 'Propiedad · AyS' };

  const title = `${item.title} · AyS Soluciones Comerciales`;
  const desc = (item.description || '').slice(0, 155)
    || `${item.prop_type || 'Propiedad'} en ${item.operation || 'venta'} en ${item.location || 'Costa Rica'}. Precio: ${item.currency || '$'}${fmtPrice(item.price)}`;
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

  const photos = item.photos || [];
  const opClass = item.operation === 'Alquiler' ? 'b-rent' : 'b-sale';

  return (
    <PageLayout>
      <div className="det-page">
        <Lightbox photos={photos} />
        {photos.length > 0 && (
          <div className="det-badge">
            <span className={`badge ${opClass}`}>{item.operation || 'Venta'}</span>
          </div>
        )}
        <div className="det-layout">
          <div>
            <p className="det-type">{item.prop_type || 'Propiedad'}</p>
            <h1 className="det-title">{item.title}</h1>
            {item.location && <p className="det-loc"><i className="fas fa-location-dot" /> {item.location}</p>}
            <p className="det-price">
              {item.currency || '$'}{fmtPrice(item.price)}
              {item.operation === 'Alquiler' && <span>/mes</span>}
            </p>

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
      </div>
    </PageLayout>
  );
}
