import { notFound } from 'next/navigation';
import { createSupabaseClient } from '@/lib/supabase';
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
  const ops = Array.isArray(item.available_operations)
    ? item.available_operations.map((op) => String(op).trim())
    : [];
  return String(item.operation_type || '').trim() === 'Venta y Alquiler'
    || (ops.includes('Venta') && ops.includes('Alquiler'));
}

function isDebtSale(item) {
  return operationType(item) === 'Venta cediendo deuda';
}

function isRentOption(item) {
  return operationType(item) === 'Alquiler con opción de compra';
}

function financialLines(item) {
  const op = operationType(item);

  if (isSaleAndRent(item)) {
    const sale = hasValue(item.sale_price) ? item.sale_price : item.price;
    return [
      hasValue(sale) && { label: 'Precio de venta', value: sale },
      hasValue(item.rent_price) && { label: 'Alquiler mensual', value: item.rent_price, suffix: '/ mes' },
    ].filter(Boolean);
  }

  if (isDebtSale(item)) {
    const downPayment = hasValue(item.down_payment) ? item.down_payment : item.price;
    return [
      hasValue(downPayment) && { label: 'Prima requerida', value: downPayment },
      hasValue(item.debt_amount) && { label: 'Deuda a asumir', value: item.debt_amount },
      hasValue(item.sale_price) && { label: 'Valor total', value: item.sale_price },
    ].filter(Boolean);
  }

  if (isRentOption(item)) {
    const rent = hasValue(item.rent_price) ? item.rent_price : item.price;
    return [
      hasValue(rent) && { label: 'Alquiler mensual', value: rent, suffix: '/ mes' },
      hasValue(item.down_payment) && { label: 'Prima/opción inicial', value: item.down_payment },
      hasValue(item.option_purchase_price) && { label: 'Precio de compra pactado', value: item.option_purchase_price },
    ].filter(Boolean);
  }

  if (op.indexOf('Alquiler') === 0) {
    const rent = hasValue(item.rent_price) ? item.rent_price : item.price;
    return [
      hasValue(rent) && { label: 'Alquiler mensual', value: rent, suffix: '/ mes' },
    ].filter(Boolean);
  }

  const sale = hasValue(item.sale_price) ? item.sale_price : item.price;
  return [
    hasValue(sale) && { label: 'Precio de venta', value: sale },
  ].filter(Boolean);
}

function financialSummary(item) {
  const cur = item.currency || '$';
  const lines = financialLines(item);
  return lines.map((line) => `${line.label}: ${cur}${fmtPrice(line.value)}${line.suffix ? ' ' + line.suffix : ''}`).join(' · ');
}

export async function generateMetadata({ params, searchParams }) {
  const mode = searchParams?.mode || 'client';
  const isBroker = mode === 'broker';
  const sb = createSupabaseClient();
  const { data: item } = await sb.from('listings').select('title,description,photos,prop_type,operation,operation_type,available_operations,location,currency,price,sale_price,rent_price,debt_amount,down_payment,option_purchase_price,finance_notes,kind,brand,year').eq('id', params.id).single();
  if (!item) return { title: 'Ficha Técnica' };

  console.log('[og:image debug] ficha', params.id, '| campos:', Object.keys(item), '| photos:', item.photos);

  const isProperty = item.kind === 'property';
  const siteName = isBroker ? 'Ficha Técnica' : 'AyS Soluciones Comerciales';
  const suffix = isBroker ? '· Ficha Técnica' : '· AyS Soluciones Comerciales';
  const title = `${item.title} ${suffix}`;
  const op = operationType(item);
  const financeText = isProperty ? financialSummary(item) : '';
  const desc = (item.description || '').slice(0, 155)
    || (isProperty
      ? `${item.prop_type || 'Propiedad'} en ${op || 'venta'} en ${item.location || 'Costa Rica'}. ${financeText || `Precio: ${item.currency || '$'}${fmtPrice(item.price)}`}`
      : `${item.brand || 'Auto'} ${item.year || ''} en venta. Precio: ${item.currency || '$'}${fmtPrice(item.price)}`);
  const img = item.photos?.[0] || '';

  return {
    title,
    description: desc,
    openGraph: { title, description: desc, images: img ? [{ url: img }] : [], type: 'website', siteName },
    twitter: { card: 'summary_large_image', title, description: desc, images: img ? [img] : [] },
  };
}

export default async function FichaPage({ params, searchParams }) {
  const mode = searchParams?.mode || 'client';
  const isBroker = mode === 'broker';

  const sb = createSupabaseClient();
  const { data: item } = await sb.from('listings').select('*').eq('id', params.id).single();
  if (!item) notFound();

  const photos = item.photos || [];
  const isProperty = item.kind === 'property';
  const operation = operationType(item);
  const financeRows = isProperty ? financialLines(item) : [];
  const financeNotes = isProperty && hasValue(item.finance_notes) ? String(item.finance_notes).trim() : '';
  const WA_NUMBER = '50685725465';
  const waMsg = encodeURIComponent(`Hola, me interesa esta publicación: ${item.title}`);

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: 'Inter, sans-serif' }}>
      {/* Header */}
      <div style={{ background: '#1b5e6e', color: '#fff', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 10 }}>
        {isBroker ? (
          <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '.5px', textTransform: 'uppercase' }}>
            Ficha Técnica
          </span>
        ) : (
          <>
            <div style={{ background: 'rgba(255,255,255,.18)', borderRadius: 8, padding: '6px 12px', fontWeight: 800, fontSize: 14 }}>AyS</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15 }}>AyS Soluciones Comerciales</div>
              <div style={{ color: 'rgba(255,255,255,.7)', fontSize: 12 }}>ays.homes</div>
            </div>
          </>
        )}
      </div>

      {/* Gallery */}
      <Lightbox photos={photos} />

      {/* Body */}
      <div style={{ maxWidth: 680, margin: '0 auto', padding: '1.5rem 1.2rem 3rem' }}>
        <p style={{ fontSize: 12, color: '#c08b2f', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>
          {isProperty ? (item.prop_type || 'Propiedad') : `${item.brand || 'Auto'}${item.year ? ' · ' + item.year : ''}`}
          {isProperty && operation ? ' · ' + operation : ''}
        </p>
        <h1 style={{ fontSize: 'clamp(1.5rem,5vw,2rem)', fontWeight: 800, marginBottom: 8, letterSpacing: '-.02em' }}>{item.title}</h1>

        {item.location && (
          <p style={{ color: '#64748b', fontSize: 15, display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16 }}>
            <i className="fas fa-location-dot" style={{ color: '#1b5e6e' }} /> {item.location}
          </p>
        )}

        {isProperty && financeRows.length > 0 ? (
          <div style={{ fontSize: 'clamp(1.5rem,5vw,2rem)', fontWeight: 800, color: '#1b5e6e', marginBottom: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {financeRows.map((row) => (
              <div key={row.label}>
                <span style={{ fontSize: 15, fontWeight: 600, color: '#64748b' }}>{row.label}: </span>
                {item.currency || '$'}{fmtPrice(row.value)}
                {row.suffix && <span style={{ fontSize: 15, fontWeight: 400, color: '#64748b' }}> {row.suffix}</span>}
              </div>
            ))}
          </div>
        ) : (
          <p style={{ fontSize: 'clamp(1.5rem,5vw,2rem)', fontWeight: 800, color: '#1b5e6e', marginBottom: 20 }}>
            {item.currency || '$'}{fmtPrice(item.price)}
            {isProperty && operation.indexOf('Alquiler') === 0 && <span style={{ fontSize: 15, fontWeight: 400, color: '#64748b' }}>/mes</span>}
          </p>
        )}

        {financeNotes && (
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: '1.2rem', marginBottom: 16 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>Notas financieras</h3>
            <p style={{ fontSize: 14, color: '#1b5e6e', lineHeight: 1.75 }}>{financeNotes}</p>
          </div>
        )}

        {/* Specs */}
        {isProperty
          ? (item.beds || item.baths || item.area || item.parking) && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: '1rem 1.2rem', marginBottom: 16 }}>
              {item.beds && <span style={{ fontSize: 14, color: '#64748b', display: 'flex', alignItems: 'center', gap: 6 }}><i className="fas fa-bed" style={{ color: '#1b5e6e' }} /> {item.beds} hab.</span>}
              {item.baths && <span style={{ fontSize: 14, color: '#64748b', display: 'flex', alignItems: 'center', gap: 6 }}><i className="fas fa-bath" style={{ color: '#1b5e6e' }} /> {item.baths} baños</span>}
              {item.area && <span style={{ fontSize: 14, color: '#64748b', display: 'flex', alignItems: 'center', gap: 6 }}><i className="fas fa-expand-arrows-alt" style={{ color: '#1b5e6e' }} /> {item.area} m²</span>}
              {item.parking && <span style={{ fontSize: 14, color: '#64748b', display: 'flex', alignItems: 'center', gap: 6 }}><i className="fas fa-car" style={{ color: '#1b5e6e' }} /> {item.parking} parq.</span>}
            </div>
          )
          : (item.km || item.transmission || item.fuel || item.color) && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: '1rem 1.2rem', marginBottom: 16 }}>
              {item.km && <span style={{ fontSize: 14, color: '#64748b', display: 'flex', alignItems: 'center', gap: 6 }}><i className="fas fa-tachometer-alt" style={{ color: '#1b5e6e' }} /> {item.km}</span>}
              {item.transmission && <span style={{ fontSize: 14, color: '#64748b', display: 'flex', alignItems: 'center', gap: 6 }}><i className="fas fa-cog" style={{ color: '#1b5e6e' }} /> {item.transmission}</span>}
              {item.fuel && <span style={{ fontSize: 14, color: '#64748b', display: 'flex', alignItems: 'center', gap: 6 }}><i className="fas fa-gas-pump" style={{ color: '#1b5e6e' }} /> {item.fuel}</span>}
              {item.color && <span style={{ fontSize: 14, color: '#64748b', display: 'flex', alignItems: 'center', gap: 6 }}><i className="fas fa-palette" style={{ color: '#1b5e6e' }} /> {item.color}</span>}
            </div>
          )
        }

        {item.description && (
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: '1.2rem', marginBottom: 16 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>Descripción</h3>
            <p style={{ fontSize: 14, color: '#1b5e6e', lineHeight: 1.75 }}>{item.description}</p>
          </div>
        )}

        {item.amenidades?.length > 0 && (
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: '1.2rem', marginBottom: 16 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 10 }}>{isProperty ? 'Amenidades' : 'Extras y equipamiento'}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {item.amenidades.map((a) => (
                <div key={a} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
                  <i className="fas fa-check-circle" style={{ color: '#1b5e6e', fontSize: 13 }} /> {a}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contact / WhatsApp — hidden in broker mode */}
        {!isBroker && (
          <a
            href={`https://wa.me/${WA_NUMBER}?text=${waMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: '#25d366', color: '#fff', padding: 15, borderRadius: 12, fontWeight: 700, fontSize: 15, marginTop: 20, textDecoration: 'none' }}
          >
            <i className="fab fa-whatsapp" style={{ fontSize: 18 }} /> Consultar por WhatsApp
          </a>
        )}
      </div>
    </div>
  );
}
