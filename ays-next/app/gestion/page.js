import Link from 'next/link';
import PageLayout from '@/components/PageLayout';
import GestionForm from '@/components/GestionForm';

export const metadata = {
  title: 'Gestión de Activos · AyS Soluciones Comerciales',
  description: 'Gestionamos tu propiedad, vehículo o crédito INVU. Publicamos, atendemos y coordinamos todo.',
};

export default function GestionPage() {
  return (
    <PageLayout>
      <div className="pg-hero">
        <div className="pg-icon"><i className="fas fa-briefcase" /></div>
        <h1>Gestión de Activos</h1>
        <p>Manejamos tu propiedad, vehículo o crédito INVU para que no te preocupes</p>
      </div>

      <div className="cm-bar">
        <p><strong>¿Gestionamos tu activo?</strong> Publicamos, atendemos y coordinamos todo por vos.</p>
      </div>

      {/* SERVICIOS */}
      <div className="section">
        <div className="section-inner">
          <div className="tc" style={{ marginBottom:'3rem' }}>
            <p className="s-label">Cómo trabajamos</p>
            <h2 className="s-title">Nuestro proceso de gestión</h2>
            <p className="s-sub">Nos encargamos de cada paso para que vos solo te ocupes de decidir</p>
          </div>
          <div className="mg-grid">
            {[
              { ico:'bullhorn',       t:'Publicación y Promoción',  p:'Publicamos en todas las plataformas y redes sociales para maximizar la visibilidad de tu activo.', items:['Portales inmobiliarios','Redes sociales','Fotografía profesional','Descripción optimizada'] },
              { ico:'headset',        t:'Atención de Interesados',  p:'Respondemos consultas, filtramos prospectos serios y te presentamos solo las oportunidades reales.', items:['Respuesta inmediata','Filtrado de prospectos','Reportes periódicos','Comunicación constante'] },
              { ico:'calendar-check', t:'Coordinación de Visitas',  p:'Coordinamos y acompañamos cada visita para que no tengas que preocuparte por nada.', items:['Agenda flexible','Acompañamiento presencial','Seguimiento post-visita','Informe de cada visita'] },
            ].map(({ ico, t, p, items }) => (
              <div className="mgc" key={t}>
                <div className="mg-ico"><i className={`fas fa-${ico}`} /></div>
                <h3>{t}</h3>
                <p>{p}</p>
                <ul>{items.map((i) => <li key={i}><i className="fas fa-check" /> {i}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* POR QUÉ */}
      <div style={{ background:'linear-gradient(120deg,var(--teal-d),var(--teal))', padding:'4rem 2rem' }}>
        <div className="section-inner">
          <div className="tc" style={{ marginBottom:'2.5rem' }}>
            <p className="s-label" style={{ color:'rgba(255,255,255,.6)' }}>Ventajas</p>
            <h2 className="s-title" style={{ color:'#fff' }}>Por qué elegirnos para gestionar tu activo</h2>
          </div>
          <div className="why-grid">
            {[
              ['bolt',           'Respuesta rápida a consultas'],
              ['shield-halved',  'Proceso 100% transparente'],
              ['chart-line',     'Precio de mercado justo'],
              ['handshake',      'Cierre exitoso garantizado'],
            ].map(([ico, txt]) => (
              <div className="wi" key={txt}><i className={`fas fa-${ico}`} /><p>{txt}</p></div>
            ))}
          </div>
        </div>
      </div>

      {/* FORM */}
      <div className="section s-bg">
        <div className="section-inner">
          <GestionForm />
          <p style={{ textAlign:'center', fontSize:13, color:'var(--muted)', marginTop:'1rem' }}>
            ¿Preferís hablar directamente?{' '}
            <a href="https://wa.me/50685725465" style={{ color:'var(--teal)', fontWeight:600 }}>
              <i className="fab fa-whatsapp" /> Contactar por WhatsApp
            </a>
          </p>
        </div>
      </div>
    </PageLayout>
  );
}
