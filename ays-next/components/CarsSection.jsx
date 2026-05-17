import CarCard from './CarCard';

export default function CarsSection({ cars }) {
  return (
    <>
      <div className="pg-hero">
        <div className="pg-icon"><i className="fas fa-car" /></div>
        <h1>Autos en Venta</h1>
        <p>Encontrá el vehículo perfecto. Te ayudamos con todo el proceso de compra.</p>
      </div>
      <div className="listings">
        <div className="listings-inner">
          <p className="rc"><strong>{cars.length}</strong> {cars.length === 1 ? 'vehículo disponible' : 'vehículos disponibles'}</p>
          {cars.length === 0 ? (
            <div className="loading-state">
              <i className="fas fa-car" style={{ fontSize: 32, marginBottom: 12 }} />
              <p>No hay vehículos disponibles por el momento.</p>
            </div>
          ) : (
            <div className="prop-grid">
              {cars.map((item) => <CarCard key={item.id} item={item} />)}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
