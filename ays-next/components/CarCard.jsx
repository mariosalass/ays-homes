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

  return (
    <div className="pcard" onClick={() => router.push(href)} style={{ cursor: 'pointer' }}>
      <div className="pimg">
        <img src={img} loading="lazy" alt={item.title || ''} />
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
        </div>
        <p className="pprice">{item.currency || '$'}{fmtPrice(item.price)}</p>
        <div className="pacts">
          <span className="btn-view">Ver detalles</span>
          <button
            className="btn-save"
            title="Guardar"
            onClick={(e) => e.stopPropagation()}
          >
            <i className="far fa-bookmark" />
          </button>
        </div>
      </div>
    </div>
  );
}
