'use client';
import { useRouter } from 'next/navigation';

function fmtPrice(p) {
  const n = parseFloat(String(p || '').replace(/[^0-9.]/g, ''));
  if (isNaN(n)) return p || '';
  return n.toLocaleString('es-CR');
}

const OP_CLASS = { Venta:'b-sale', Traspaso:'b-rent', Sociedad:'b-yr', Franquicia:'b-yr' };

export default function BusinessCard({ item }) {
  const router = useRouter();
  const photos = item.photos || [];
  const img = photos[0] || 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=700&q=80';
  const opClass = OP_CLASS[item.operation] || 'b-sale';

  return (
    <div className="pcard" onClick={() => router.push(`/negocio/${item.id}`)} style={{ cursor:'pointer' }}>
      <div className="pimg">
        <img src={img} loading="lazy" alt={item.title || ''} />
        <div className="pbadges">
          <span className={`badge ${opClass}`}>{item.operation || 'Venta'}</span>
          {item.featured && <span className="badge b-feat">Destacado</span>}
        </div>
        {photos.length > 1 && (
          <div className="gal-badge"><i className="fas fa-images" /> {photos.length}</div>
        )}
      </div>
      <div className="pbody">
        <p className="ptype">{item.sector || 'Negocio'}{item.business_type ? ' · ' + item.business_type : ''}</p>
        <h3 className="pname">{item.title}</h3>
        {item.location && (
          <p className="ploc"><i className="fas fa-location-dot" /> {item.location}</p>
        )}
        <p className="pprice">{item.currency || '$'}{fmtPrice(item.price)}</p>
        <div className="pacts">
          <span className="btn-view">Ver detalles</span>
          <button className="btn-save" title="Guardar" onClick={(e) => e.stopPropagation()}>
            <i className="far fa-bookmark" />
          </button>
        </div>
      </div>
    </div>
  );
}
