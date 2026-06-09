'use client';
import { useState, useMemo } from 'react';
import PropCard from './PropCard';
import { getProvincias, getcantones } from '@/lib/cr-locations';

export default function PropertiesSection({ properties }) {
  const [search, setSearch] = useState('');
  const [op, setOp] = useState('Todas');
  const [type, setType] = useState('Todas');
  const [provincia, setProvincia] = useState('');
  const [canton, setCanton] = useState('');
  const [beds, setBeds] = useState('Todas');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);

  const provincias = getProvincias();
  const cantones = getcantones(provincia);

  const filtered = useMemo(() => {
    return properties.filter((item) => {
      if (search) {
        const q = search.toLowerCase();
        if (
          !(item.title || '').toLowerCase().includes(q) &&
          !(item.location || '').toLowerCase().includes(q)
        ) return false;
      }
      if (op !== 'Todas' && item.operation !== op) return false;
      if (type !== 'Todas' && item.prop_type !== type) return false;
      if (provincia && !(item.location || '').includes(provincia)) return false;
      if (canton && !(item.location || '').includes(canton)) return false;
      if (beds !== 'Todas') {
        const b = parseInt(beds);
        if (beds === '4+') { if (!item.beds || item.beds < 4) return false; }
        else if (!item.beds || item.beds !== b) return false;
      }
      const price = parseFloat(String(item.price || '').replace(/[^0-9.]/g, ''));
      if (priceMin && !isNaN(parseFloat(priceMin)) && price < parseFloat(priceMin)) return false;
      if (priceMax && !isNaN(parseFloat(priceMax)) && price > parseFloat(priceMax)) return false;
      return true;
    });
  }, [properties, search, op, type, provincia, canton, beds, priceMin, priceMax]);

  function clearFilters() {
    setSearch(''); setOp('Todas'); setType('Todas');
    setProvincia(''); setCanton(''); setBeds('Todas');
    setPriceMin(''); setPriceMax('');
  }

  return (
    <>
      <div className="pg-hero">
        <div className="pg-icon"><i className="fas fa-building" /></div>
        <h1>Propiedades en Alquiler y/o Venta</h1>
        <p>Explorá nuestra selección de casas, apartamentos, locales, oficinas y terrenos</p>
      </div>

      <div className="filters">
        <div className="filter-top">
          <div className="sw">
            <i className="fas fa-search" />
            <input
              type="text"
              placeholder="Buscar por ubicación, título..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button
            className={`filter-toggle${panelOpen ? ' active' : ''}`}
            onClick={() => setPanelOpen(!panelOpen)}
          >
            <i className="fas fa-sliders" /> Más filtros
          </button>
        </div>
        <div className={`filter-panel${panelOpen ? ' open' : ''}`}>
          <div className="fg-grid">
            <div className="fg">
              <label>Transacción</label>
              <select value={op} onChange={(e) => setOp(e.target.value)}>
                <option>Todas</option><option>Venta</option><option>Alquiler</option>
              </select>
            </div>
            <div className="fg">
              <label>Tipo</label>
              <select value={type} onChange={(e) => setType(e.target.value)}>
                <option>Todas</option><option>Casa</option><option>Apartamento</option>
                <option>Edificio</option><option>Local</option><option>Terreno</option><option>Oficina</option>
              </select>
            </div>
            <div className="fg">
              <label>Provincia</label>
              <select value={provincia} onChange={(e) => { setProvincia(e.target.value); setCanton(''); }}>
                <option value="">Todas</option>
                {provincias.map((p) => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div className="fg">
              <label>Cantón</label>
              <select value={canton} onChange={(e) => setCanton(e.target.value)} disabled={!provincia}>
                <option value="">Todos</option>
                {cantones.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="fg">
              <label>Habitaciones</label>
              <select value={beds} onChange={(e) => setBeds(e.target.value)}>
                <option>Todas</option><option>1</option><option>2</option><option>3</option><option>4+</option>
              </select>
            </div>
            <div className="fg">
              <label>Precio mín</label>
              <input type="text" placeholder="0" value={priceMin} onChange={(e) => setPriceMin(e.target.value)} />
            </div>
            <div className="fg">
              <label>Precio máx</label>
              <input type="text" placeholder="Sin límite" value={priceMax} onChange={(e) => setPriceMax(e.target.value)} />
            </div>
          </div>
          <button className="clr-btn" onClick={clearFilters}>✕ Limpiar filtros</button>
        </div>
      </div>

      <div className="listings">
        <div className="listings-inner">
          <p className="rc">
            <strong>{filtered.length}</strong> {filtered.length === 1 ? 'propiedad encontrada' : 'propiedades encontradas'}
          </p>
          {filtered.length === 0 ? (
            <div className="loading-state">
              <i className="fas fa-building" style={{ fontSize: 32, marginBottom: 12 }} />
              <p>No se encontraron propiedades con esos filtros.</p>
            </div>
          ) : (
            <div className="prop-grid">
              {filtered.map((item) => <PropCard key={item.id} item={item} />)}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
