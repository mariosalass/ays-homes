import Link from 'next/link';
import PageLayout from '@/components/PageLayout';
import CreditosForm from '@/components/CreditosForm';

export const metadata = {
  title: 'Créditos y Financiamiento · AyS Soluciones Comerciales',
  description: 'Créditos privados y planes INVU en Costa Rica. Sin bancos, tasas negociables.',
};

export default function CreditosPage() {
  return (
    <PageLayout>
      <div className="pg-hero">
        <div className="pg-icon"><i className="fas fa-credit-card" /></div>
        <h1>Créditos y Financiamiento</h1>
        <p>Soluciones de crédito con prestamistas privados y planes del INVU</p>
      </div>

      <div className="section">
        <div className="section-inner">
          <div className="cr-grid">
            <div className="crc">
              <div className="cr-ico ciy"><i className="fas fa-hand-holding-dollar" /></div>
              <h3>Crédito Privado</h3>
              <div className="al-b"><strong>Importante:</strong> Trabajamos con prestamistas privados, no con bancos. Tasas y condiciones son negociables según el caso.</div>
              <h4>¿Qué podés financiar?</h4>
              <ul className="cr-ul">
                <li><i className="fas fa-check-circle" />Compra de propiedad (hipoteca)</li>
                <li><i className="fas fa-check-circle" />Vehículos con garantía</li>
                <li><i className="fas fa-check-circle" />Capital de trabajo</li>
                <li><i className="fas fa-check-circle" />Deudas o urgencias</li>
              </ul>
              <h4>Requisitos generales</h4>
              <ul className="cr-ul">
                <li><i className="fas fa-check-circle" />Garantía hipotecaria o prendaria</li>
                <li><i className="fas fa-check-circle" />Documentos de identidad</li>
                <li><i className="fas fa-check-circle" />Avalúo del bien</li>
              </ul>
              <div className="gt-b"><i className="fas fa-info-circle" /><span>Contactanos para evaluar tu caso y conectarte con el prestamista adecuado para tus necesidades.</span></div>
            </div>
            <div className="crc">
              <div className="cr-ico cib"><i className="fas fa-landmark" /></div>
              <h3>Plan INVU</h3>
              <div className="in-bl"><i className="fas fa-info-circle" /><span>Asesoramos la compra de planes maduros del INVU, una opción de vivienda con beneficios especiales para costarricenses.</span></div>
              <h4>¿Qué es un plan maduro?</h4>
              <ul className="cr-ul">
                <li><i className="fas fa-check-circle" />Plan de vivienda con años de antigüedad</li>
                <li><i className="fas fa-check-circle" />Financiamiento con tasas preferenciales</li>
                <li><i className="fas fa-check-circle" />Acceso a proyectos específicos del INVU</li>
              </ul>
              <h4>Beneficios</h4>
              <ul className="cr-ul">
                <li><i className="fas fa-check-circle" />Tasas de interés preferenciales</li>
                <li><i className="fas fa-check-circle" />Plazos extendidos de pago</li>
                <li><i className="fas fa-check-circle" />Asesoría completa del proceso</li>
              </ul>
              <div className="cb">
                <h4>Nota importante</h4>
                <p>Los planes INVU tienen disponibilidad limitada. Contactanos para verificar opciones actuales y disponibilidad en tu zona de interés.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FORM */}
      <div className="section s-bg">
        <div className="section-inner">
          <CreditosForm />
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
