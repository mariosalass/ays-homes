'use client';
import { useRouter } from 'next/navigation';

function fmtPrice(p) {
  const n = parseFloat(String(p || '').replace(/[^0-9.]/g, ''));
  if (isNaN(n)) return p || '';
  return n.toLocaleString('es-CR');
}

export default function PropCard({ item }) {
  const router = useRouter();
  const href = `/propiedad/${item.id}`;
  const photos = item.photos || [];
  const img = photos[0] || 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=700&q=80';
  const opClass = item.operation === 'Alquiler' ? 'b-rent' : 'b-sale';

  return (
    <div className="pcard" onClick={() => router.push(href)} style={{ cursor: 'pointer' }}>
      <div className="pimg">
        <img src={img} width="700" height="460" loading="lazy" decoding="async" alt={item.title || ''} />
        <div className="pbadges">
          <span className={`badge ${opClass}`}>{item.operation || 'Venta'}</span>
          {item.featured && <span className="badge b-feat">Destacado</span>}
        </div>
        {photos.length > 1 && (
          <div className="gal-badge">
            <i className="fas fa-images" /> {photos.length}
          </div>
        )}
      </div>
      <div className="pbody">
        <p className="ptype">{item.prop_type || 'Propiedad'}</p>
        <h3 className="pname">{item.title}</h3>
        {item.location && (
          <p className="ploc">
            <i className="fas fa-location-dot" /> {item.location}
          </p>
        )}
        <p className="pprice">
          {item.currency || '$'}{fmtPrice(item.price)}
          {item.operation === 'Alquiler' && <span>/mes</span>}
        </p>
        {(item.beds || item.baths || item.area || item.parking) && (
          <div className="pspecs">
            {item.beds    && <span className="pspec"><i className="fas fa-bed" />    {item.beds}</span>}
            {item.baths   && <span className="pspec"><i className="fas fa-bath" />   {item.baths}</span>}
            {item.area    && <span className="pspec"><i className="fas fa-expand" /> {item.area} m²</span>}
            {item.parking && <span className="pspec"><i className="fas fa-car" />    {item.parking}</span>}
          </div>
        )}
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
