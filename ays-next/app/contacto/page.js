import PageLayout from '@/components/PageLayout';
import ContactForm from '@/components/ContactForm';

export const metadata = {
  title: 'Contacto · AyS Soluciones Comerciales',
  description: 'Contactanos por teléfono, WhatsApp o formulario. Respondemos en menos de 24 horas.',
};

export default function ContactoPage() {
  return (
    <PageLayout>
      <div className="pg-hero">
        <div className="pg-icon"><i className="fas fa-comment-dots" /></div>
        <h1>Contáctanos</h1>
        <p>Estamos aquí para ayudarte. Escribinos y te responderemos a la brevedad.</p>
      </div>

      <div className="ct-wrap">
        <div>
          <div className="ci">
            <div className="ci-ic"><i className="fas fa-phone" /></div>
            <div><h4>Teléfono / WhatsApp</h4><p>+506 8572-5465</p><p>+506 8321-5948</p><span>Respuesta inmediata</span></div>
          </div>
          <div className="ci">
            <div className="ci-ic"><i className="fas fa-envelope" /></div>
            <div><h4>Correo electrónico</h4><p>info@ays.homes</p><span>Respondemos en menos de 24 horas</span></div>
          </div>
          <div className="ci">
            <div className="ci-ic"><i className="fas fa-clock" /></div>
            <div><h4>Horario de atención</h4><p>Lun - Vie: 8:00 - 18:00</p><span>Sábados: 9:00 - 13:00</span></div>
          </div>
          <div className="ci">
            <div className="ci-ic"><i className="fas fa-location-dot" /></div>
            <div><h4>Ubicación</h4><p>San José, Costa Rica</p><span>Atendemos todo el país</span></div>
          </div>
          <div className="sc">
            <h4>Síguenos en redes sociales</h4>
            <p>Publicamos propiedades, autos y oportunidades de crédito todos los días.</p>
            <div className="sc-btns">
              <a className="sc-btn ig" href="https://www.instagram.com/ays_soluciones_comerciales/" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram" /></a>
              <a className="sc-btn fb" href="https://www.facebook.com/ayssolucionescomerciales" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook" /></a>
              <a className="sc-btn tk" href="https://www.tiktok.com/@ayssolucionescomerciales" target="_blank" rel="noopener noreferrer"><i className="fab fa-tiktok" /></a>
            </div>
          </div>
        </div>
        <ContactForm />
      </div>

      <div className="wa-sec">
        <div className="wa-ico"><i className="fab fa-whatsapp" /></div>
        <h3>¿Preferís hablar directamente?</h3>
        <p>Escribinos por WhatsApp y te atendemos de inmediato</p>
        <a className="btn-wa" href="https://wa.me/50685725465" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-whatsapp" /> Chatear por WhatsApp
        </a>
      </div>
    </PageLayout>
  );
}
