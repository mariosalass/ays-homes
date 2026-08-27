import Link from 'next/link';
import PageLayout from '@/components/PageLayout';
import PropCard from '@/components/PropCard';
import CarCard from '@/components/CarCard';
import BusinessCard from '@/components/BusinessCard';
import { getListingsByKind } from '@/lib/listings';

const WA = 'https://wa.me/50685725465';

async function getFeatured() {
  try {
    const [allProps, allCars, allBiz] = await Promise.all([
      getListingsByKind('property', 9),
      getListingsByKind('car', 9),
      getListingsByKind('business', 6),
    ]);
    const props = allProps || [];
    const cars  = allCars  || [];
    const biz   = allBiz   || [];
    const featProps = props.filter(p => p.featured).slice(0, 3);
    const featCars  = cars.filter(c => c.featured).slice(0, 3);
    const featBiz   = biz.filter(b => b.featured).slice(0, 3);
    return {
      properties:  featProps.length > 0 ? featProps : props.slice(0, 3),
      cars:        featCars.length  > 0 ? featCars  : cars.slice(0, 3),
      businesses:  featBiz.length   > 0 ? featBiz   : biz.slice(0, 3),
    };
  } catch {
    return { properties: [], cars: [], businesses: [] };
  }
}

export const revalidate = 60;

export default async function HomePage() {
  const { properties, cars, businesses } = await getFeatured();

  return (
    <PageLayout>
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="hero-pill"><span />Adrián Salas &amp; Susy Bazo · Agentes Inmobiliarios</div>
          <h1>Encontrá tu propiedad ideal, tu próximo auto, el <em>negocio perfecto</em> o la solución de financiamiento que necesitás</h1>
          <p>Venta y alquiler de propiedades, autos, negocios en venta o traspaso, créditos con prestamistas privados y planes del INVU.</p>
          <div className="hero-btns">
            <Link className="btn-gold" href="/propiedades"><i className="fas fa-building" /> Ver propiedades</Link>
            <Link className="btn-ghost" href="/negocios"><i className="fas fa-store" /> Negocios</Link>
            <Link className="btn-ghost" href="/autos"><i className="fas fa-car" /> Ver autos</Link>
          </div>
          <div className="hero-links">
            <Link className="hero-link" href="/contacto"><i className="fas fa-calendar-plus" /> Agendar visita →</Link>
            <Link className="hero-link" href="/gestion"><i className="fas fa-briefcase" /> Gestión de activos →</Link>
          </div>
        </div>
        <div className="scroll-hint"><i className="fas fa-chevron-down" /><span>Scroll</span></div>
      </section>

      {/* SERVICIOS */}
      <div className="section s-bg">
        <div className="section-inner">
          <div className="tc">
            <p className="s-label">Nuestros servicios</p>
            <h2 className="s-title">Soluciones integrales para tus necesidades</h2>
            <p className="s-sub">Ofrecemos un acompañamiento completo en cada una de nuestras áreas de servicio</p>
          </div>
          <div className="svc-grid">
            {[
              { href:'/propiedades', ico:'building', cls:'ico-b', ck:'ck-b', t:'Propiedades', p:'Venta y alquiler de casas, apartamentos, oficinas, locales, terrenos y más.', items:['Casas y apartamentos','Locales comerciales','Terrenos','Oficinas y bodegas'], cta:'Ver propiedades' },
              { href:'/autos',       ico:'car',      cls:'ico-g', ck:'ck-g', t:'Autos en venta', p:'Encontrá el vehículo perfecto. Te ayudamos con todo el proceso de compra.', items:['Autos seminuevos','Variedad de marcas','Asesoría completa','Pruebas de manejo'], cta:'Ver autos' },
              { href:'/creditos',    ico:'credit-card', cls:'ico-y', ck:'ck-y', t:'Créditos y Financiamiento', p:'Créditos con prestamistas privados y asesoría en planes maduros del INVU.', items:['Prestamistas privados','Garantía hipotecaria','Planes INVU','Sin bancos'], cta:'Ver opciones' },
              { href:'/negocios',    ico:'store',     cls:'ico-g', ck:'ck-g', t:'Negocios', p:'Compra, vende o traspasá un negocio. Encontrá la oportunidad perfecta o el comprador ideal.', items:['Negocios en venta','Traspasos','Sociedades','Franquicias'], cta:'Ver negocios' },
              { href:'/gestion',     ico:'briefcase', cls:'ico-p', ck:'ck-p', t:'Gestión de Activos', p:'Manejamos tu propiedad, vehículo o crédito INVU para que no te preocupes.', items:['Publicación y promoción','Atención de interesados','Coordinación de visitas','Gestión completa'], cta:'Más información' },
            ].map(({ href, ico, cls, ck, t, p, items, cta }) => (
              <Link key={t} className="svc-card" href={href} style={{ textDecoration:'none', color:'inherit' }}>
                <div className={`svc-ico ${cls}`}><i className={`fas fa-${ico}`} /></div>
                <h3>{t}</h3>
                <p>{p}</p>
                <ul className="svc-list">
                  {items.map((i) => <li key={i}><span className={`ck ${ck}`}><i className="fas fa-check" /></span>{i}</li>)}
                </ul>
                <span className="btn-text">{cta} <i className="fas fa-arrow-right" /></span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* PROPIEDADES DESTACADAS */}
      {properties.length > 0 && (
        <div className="section">
          <div className="section-inner">
            <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:'2rem', flexWrap:'wrap', gap:'1rem' }}>
              <div>
                <p className="s-label">Inmuebles</p>
                <h2 className="s-title">Propiedades destacadas</h2>
              </div>
              <Link href="/propiedades" className="btn-text" style={{ flexShrink:0 }}>
                Ver todas las propiedades <i className="fas fa-arrow-right" />
              </Link>
            </div>
            <div className="prop-grid">
              {properties.map((item) => <PropCard key={item.id} item={item} />)}
            </div>
          </div>
        </div>
      )}

      {/* AUTOS DESTACADOS */}
      {cars.length > 0 && (
        <div className="section s-bg">
          <div className="section-inner">
            <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:'2rem', flexWrap:'wrap', gap:'1rem' }}>
              <div>
                <p className="s-label">Vehículos</p>
                <h2 className="s-title">Autos destacados</h2>
              </div>
              <Link href="/autos" className="btn-text" style={{ flexShrink:0 }}>
                Ver todos los autos <i className="fas fa-arrow-right" />
              </Link>
            </div>
            <div className="prop-grid">
              {cars.map((item) => <CarCard key={item.id} item={item} />)}
            </div>
          </div>
        </div>
      )}

      {/* NEGOCIOS DESTACADOS */}
      {businesses.length > 0 && (
        <div className="section">
          <div className="section-inner">
            <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:'2rem', flexWrap:'wrap', gap:'1rem' }}>
              <div>
                <p className="s-label">Oportunidades</p>
                <h2 className="s-title">Negocios destacados</h2>
              </div>
              <Link href="/negocios" className="btn-text" style={{ flexShrink:0 }}>
                Ver todos los negocios <i className="fas fa-arrow-right" />
              </Link>
            </div>
            <div className="prop-grid">
              {businesses.map((item) => <BusinessCard key={item.id} item={item} />)}
            </div>
          </div>
        </div>
      )}

      {/* ABOUT PREVIEW */}
      <div className="section">
        <div className="section-inner">
          <div className="about-wrap">
            <div className="agent-photos">
              <div className="agent-card">
                <img src="/adrianfoto.jpg" alt="Adrián Salas" />
                <div className="agent-lbl"><h4>Adrián Salas</h4><p>Agente Inmobiliario</p></div>
              </div>
              <div className="agent-card">
                <img src="/susyfoto.jpg" alt="Susy Bazo" />
                <div className="agent-lbl"><h4>Susy Bazo</h4><p>Agente Inmobiliaria</p></div>
              </div>
            </div>
            <div className="about-text">
              <p className="s-label">Quiénes somos</p>
              <h2 className="s-title">Tu socio de confianza en soluciones comerciales</h2>
              <p><strong>AyS Soluciones Comerciales</strong> es una empresa fundada por Adrián Salas y Susy Bazo, agentes inmobiliarios comprometidos con ayudar a personas a comprar, vender y alquilar propiedades, vender autos y conseguir soluciones de financiamiento.</p>
              <div className="avals">
                <div className="av"><div className="av-icon"><i className="fas fa-shield-halved" /></div><h4>Confianza</h4><p>Transparencia en cada transacción</p></div>
                <div className="av"><div className="av-icon"><i className="fas fa-users" /></div><h4>Experiencia</h4><p>Años en el mercado</p></div>
                <div className="av"><div className="av-icon"><i className="fas fa-heart" /></div><h4>Acompañamiento</h4><p>Cada paso del proceso</p></div>
              </div>
              <Link className="btn-teal" href="/nosotros">Conocer más sobre nosotros <i className="fas fa-arrow-right" /></Link>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="cta-band">
        <div className="cta-badge">¿Listo para empezar?</div>
        <h2>Estamos aquí para ayudarte a encontrar la mejor solución</h2>
        <p>Agenda una visita, solicita información o cuéntanos qué necesitás.</p>
        <div className="cta-btns">
          <Link className="btn-gold" href="/contacto"><i className="fas fa-calendar" /> Agendar una cita</Link>
          <a className="btn-wapp" href={WA} target="_blank" rel="noopener noreferrer"><i className="fab fa-whatsapp" /> Hablar por WhatsApp</a>
        </div>
        <div className="cta-pills">
          <span className="cta-pill"><span className="dot dg" />Respuesta en menos de 24 horas</span>
          <span className="cta-pill"><span className="dot dgo" />Sin compromiso</span>
          <span className="cta-pill"><span className="dot db" />Asesoría gratuita inicial</span>
        </div>
      </div>
    </PageLayout>
  );
}
