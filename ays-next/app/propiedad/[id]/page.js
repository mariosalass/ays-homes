export const revalidate = 0;

import { getListingById } from '@/lib/listings';
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
  const canonical = `https://www.ays.homes/propiedad/${params.id}`;
  const item = await getListingById(params.id);
  if (!item) return { title: 'Propiedad · AyS', alternates: { canonical } };

  const loc = [item.distrito, item.canton, item.provincia].filter(Boolean).join(', ') || item.location || 'Costa Rica';
  const op = operationType(item);
  const title = `${item.prop_type || 'Propiedad'} en ${op || 'venta'} en ${loc} — ${item.currency || '$'}${fmtPrice(item.price)} | AyS`;
  const desc = (item.description || '').slice(0, 155)
    || `${item.prop_type || 'Propiedad'} en ${op || 'venta'} en ${loc}. Precio: ${item.currency || '$'}${fmtPrice(item.price)}`;
  const img = item.photos?.[0] || '';

  return {
    title,
    description: desc,
    alternates: { canonical },
    openGraph: { title, description: desc, url: `https://www.ays.homes/propiedad/${params.id}`, images: img ? [{ url: img }] : [], type: 'website', siteName: 'AyS Soluciones Comerciales' },
    twitter: { card: 'summary_large_image', title, description: desc, images: img ? [img] : [] },
  };
}

export default async function PropiedadPage({ params }) {
  const item = await getListingById(params.id);
  if (!item) return (
    <PageLayout>
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.2rem', textAlign: 'center', padding: '3rem' }}>
        <i className="fas fa-house-circle-xmark" style={{ fontSize: '3rem', color: '#cbd5e1' }} />
        <h1 style={{ fontSize: '1.6rem', fontWeight: 700 }}>Esta publicación ya no está disponible</h1>
        <p style={{ color: '#64748b' }}>Es posible que haya sido eliminada o que el enlace sea incorrecto.</p>
        <a href="/" style={{ background: 'var(--teal)', color: '#fff', padding: '12px 28px', borderRadius: '10px', fontWeight: 600, textDecoration: 'none' }}>Volver al inicio</a>
      </div>
    </PageLayout>
  );

  const photos = item.photos || [];
  const operation = operationType(item);
  const isSaleRent   = isSaleAndRent(item);
  const isDebtSale   = String(item.operation_type || '').trim() === 'Venta cediendo deuda';
  const isRentOption = String(item.operation_type || '').trim() === 'Alquiler con opción de compra';
  const salePrice    = hasValue(item.sale_price) ? item.sale_price : item.price;
  const rentPrice    = item.rent_price;
  const cur          = item.currency || '$';
  const opClass      = operation.indexOf('Alquiler') === 0 ? 'b-rent' : 'b-sale';

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
            <span className={`badge ${opClass}`}>{isSaleRent ? 'Alquiler y/o Venta' : operation}</span>
          </div>
        )}
        <div className="det-layout">
          <div>
            <p className="det-type">{item.prop_type || 'Propiedad'}</p>
            <h1 className="det-title">{item.title}</h1>
            {item.location && <p className="det-loc"><i className="fas fa-location-dot" /> {item.location}</p>}
            {isSaleRent ? (
              <div className="det-price" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {hasValue(salePrice) && <div>Venta: {cur}{fmtPrice(salePrice)}</div>}
                {hasValue(rentPrice) && <div>Alquiler: {cur}{fmtPrice(rentPrice)} <span>/mes</span></div>}
              </div>
            ) : (
              <p className="det-price">
                {isDebtSale && <span style={{ fontSize: '1rem', fontWeight: 500 }}>Prima: </span>}
                {cur}{fmtPrice(item.price)}
                {operation.indexOf('Alquiler') === 0 && <span>/mes</span>}
              </p>
            )}

            {(isDebtSale || isRentOption) && (
              <div className="ibox">
                <h3>Detalle financiero</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                  {isRentOption && (<>
                    {hasValue(item.down_payment) && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', borderBottom: '1px solid var(--border)', fontSize: '14.5px' }}>
                        <span style={{ color: 'var(--muted)' }}>Prima inicial</span>
                        <span style={{ fontWeight: 600 }}>{cur}{fmtPrice(item.down_payment)}</span>
                      </div>
                    )}
                    {hasValue(item.option_purchase_price) && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', fontSize: '14.5px' }}>
                        <span style={{ color: 'var(--muted)' }}>Precio de compra pactado</span>
                        <span style={{ fontWeight: 600 }}>{cur}{fmtPrice(item.option_purchase_price)}</span>
                      </div>
                    )}
                  </>)}
                  {isDebtSale && (<>
                    {hasValue(item.sale_price) && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', borderBottom: '1px solid var(--border)', fontSize: '14.5px' }}>
                        <span style={{ color: 'var(--muted)' }}>Valor total de la propiedad</span>
                        <span style={{ fontWeight: 600 }}>{cur}{fmtPrice(item.sale_price)}</span>
                      </div>
                    )}
                    {hasValue(item.debt_amount) && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', fontSize: '14.5px' }}>
                        <span style={{ color: 'var(--muted)' }}>Deuda cedida</span>
                        <span style={{ fontWeight: 600 }}>{cur}{fmtPrice(item.debt_amount)}</span>
                      </div>
                    )}
                  </>)}
                </div>
              </div>
            )}

            {item.finance_notes && (
              <div className="ibox">
                <h3>Notas financieras</h3>
                <p style={{ fontSize: '14.5px', lineHeight: 1.75 }}>{item.finance_notes}</p>
              </div>
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
