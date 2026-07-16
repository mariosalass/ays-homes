'use client';
import { useRouter } from 'next/navigation';

function fmtPrice(p) {
  const n = parseFloat(String(p || '').replace(/[^0-9.]/g, ''));
  if (isNaN(n)) return p || '';
  return n.toLocaleString('es-CR');
}

export default function CarCard({ item }) {
  const router = useRouter();
  const href = `/vehiculo/${item.id}`;
  const photos = item.photos || [];
  const img = photos[0] || 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=700&q=80';
  const isUnavailable = item.available === false;

  return (
    <div
      className={`pcard${isUnavailable ? ' unavailable' : ''}`}
      onClick={() => {
        if (!isUnavailable) router.push(href);
      }}
      style={{ cursor: isUnavailable ? 'default' : 'pointer' }}
    >
      <div className="pimg">
        <img src={img} width="700" height="460" loading="lazy" decoding="async" alt={item.title || ''} />
        {isUnavailable && <div className="unavailable-overlay">NO DISPONIBLE</div>}
        <div className="pbadges">
          {item.year     && <span className="badge b-yr">{item.year}</span>}
          {item.featured && <span className="badge b-feat">Destacado</span>}
        </div>
        {photos.length > 1 && (
          <div className="gal-badge">
            <i className="fas fa-images" /> {photos.length}
          </div>
        )}
      </div>
      <div className="pbody">
        <p className="ptype">{item.brand || 'Auto'}</p>
        <h3 className="pname">{item.title}</h3>
        <div className="pspecs">
          {item.km           && <span className="pspec"><i className="fas fa-tachometer-alt" /> {item.km}</span>}
          {item.transmission && <span className="pspec"><i className="fas fa-cog" />            {item.transmission}</span>}
          {item.fuel         && <span className="pspec"><i className="fas fa-gas-pump" />       {item.fuel}</span>}
          {item.engine       && <span className="pspec"><i className="fas fa-gauge" />          {item.engine}</span>}
        </div>
        <p className="pprice">{item.currency || '$'}{fmtPrice(item.price)}</p>
        <div className="pacts">
          <span className="btn-view">Ver detalles</span>
          <button
            className="btn-save"
            title="Guardar"
            disabled={isUnavailable}
            onClick={(e) => e.stopPropagation()}
          >
            <i className="far fa-bookmark" />
          </button>
        </div>
      </div>
    </div>
  );
}
