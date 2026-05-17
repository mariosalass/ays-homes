import Link from 'next/link';
import PageLayout from '@/components/PageLayout';

export const metadata = {
  title: 'Sobre Nosotros · AyS Soluciones Comerciales',
  description: 'Conocé a Adrián Salas y Susy Bazo, agentes inmobiliarios comprometidos con ayudarte.',
};

export default function NosotrosPage() {
  return (
    <PageLayout>
      <div className="pg-hero">
        <div className="pg-icon"><i className="fas fa-users" /></div>
        <h1>Sobre Nosotros</h1>
        <p>Conocé al equipo detrás de AyS Soluciones Comerciales</p>
      </div>

      {/* EQUIPO */}
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
              <p>Con años de experiencia en el mercado costarricense, nuestro equipo ofrece un servicio personalizado, transparente y orientado a resultados. Creemos en construir relaciones de largo plazo basadas en la confianza.</p>
              <div className="avals">
                <div className="av"><div className="av-icon"><i className="fas fa-shield-halved" /></div><h4>Confianza</h4><p>Transparencia en cada transacción</p></div>
                <div className="av"><div className="av-icon"><i className="fas fa-users" /></div><h4>Experiencia</h4><p>Años en el mercado</p></div>
                <div className="av"><div className="av-icon"><i className="fas fa-heart" /></div><h4>Acompañamiento</h4><p>Cada paso del proceso</p></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* VALORES */}
      <div className="section s-bg">
        <div className="section-inner">
          <div className="tc">
            <p className="s-label">Nuestros valores</p>
            <h2 className="s-title">Por qué elegirnos</h2>
            <p className="s-sub">Trabajamos con principios que guían cada interacción con nuestros clientes</p>
          </div>
          <div className="vg" style={{ marginTop: '2.5rem' }}>
            {[
              { ico:'handshake', t:'Honestidad', p:'Te decimos la verdad sobre el mercado, los precios y las condiciones. Sin promesas vacías.' },
              { ico:'clock', t:'Rapidez', p:'Respondemos en menos de 24 horas y movernos con agilidad para no perder oportunidades.' },
              { ico:'magnifying-glass', t:'Conocimiento del mercado', p:'Conocemos el mercado costarricense en profundidad para darte el mejor consejo.' },
              { ico:'star', t:'Excelencia', p:'Cada cliente merece atención de primera. Cuidamos cada detalle del proceso.' },
              { ico:'phone', t:'Disponibilidad', p:'Estamos disponibles cuando nos necesitás, incluyendo fines de semana.' },
              { ico:'trophy', t:'Resultados', p:'Nuestro éxito se mide por el tuyo. Trabajamos hasta lograr el mejor resultado posible.' },
            ].map(({ ico, t, p }) => (
              <div className="vc" key={t}>
                <i className={`fas fa-${ico}`} />
                <h3>{t}</h3>
                <p>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TESTIMONIOS */}
      <div className="section">
        <div className="section-inner">
          <div className="tc">
            <p className="s-label">Lo que dicen nuestros clientes</p>
            <h2 className="s-title">Testimonios</h2>
          </div>
          <div className="tg" style={{ marginTop: '2.5rem' }}>
            {[
              { q:'Adrián nos ayudó a encontrar la propiedad ideal en tiempo récord. Su conocimiento del mercado es impresionante y su trato muy profesional.', name:'Carlos Jiménez', role:'Comprador en Escazú' },
              { q:'Susy fue increíblemente paciente y atenta durante todo el proceso de alquiler. Siempre disponible y muy detallista. La recomiendo ampliamente.', name:'María Rodríguez', role:'Cliente de alquiler' },
              { q:'Gracias a AyS pude vender mi propiedad en menos de 30 días y al precio que necesitaba. La gestión fue impecable de principio a fin.', name:'Roberto Vargas', role:'Vendedor en Heredia' },
            ].map(({ q, name, role }) => (
              <div className="tc2" key={name}>
                <div className="qm">&ldquo;</div>
                <p>{q}</p>
                <div className="ta-name"><h4>{name}</h4><span>{role}</span></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="cta-band">
        <div className="cta-badge">¿Listo para trabajar con nosotros?</div>
        <h2>Contactanos y empecemos a trabajar juntos</h2>
        <p>Estamos listos para ayudarte a alcanzar tus objetivos inmobiliarios.</p>
        <div className="cta-btns">
          <Link className="btn-gold" href="/contacto"><i className="fas fa-envelope" /> Contactar ahora</Link>
          <a className="btn-wapp" href="https://wa.me/50685725465" target="_blank" rel="noopener noreferrer"><i className="fab fa-whatsapp" /> WhatsApp</a>
        </div>
      </div>
    </PageLayout>
  );
}
