'use client';
import { useState } from 'react';

const SERVICE_ID  = 'service_myh633o';
const TEMPLATE_ID = 'template_1mf0628';
const PUBLIC_KEY  = 'GZjKIJ2FxGHEJeCdF';

export default function GestionForm() {
  const [name, setName]   = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [tipo, setTipo]   = useState('');
  const [desc, setDesc]   = useState('');
  const [btn, setBtn]     = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name || !email || !phone || !tipo) {
      alert('Por favor completá nombre, correo, teléfono y tipo de activo.');
      return;
    }
    setLoading(true); setBtn('Enviando...');
    try {
      const emailjs = (await import('@emailjs/browser')).default;
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        from_name: name, from_email: email, phone,
        subject: `Gestión de activo: ${tipo}`,
        message: `Activo: ${tipo}\nDescripción: ${desc || 'No indicado'}`,
      }, PUBLIC_KEY);
      setBtn('¡Mensaje enviado!');
      setName(''); setEmail(''); setPhone(''); setTipo(''); setDesc('');
      setTimeout(() => setBtn(null), 3000);
    } catch (err) {
      console.error('[EmailJS]', err);
      alert('Error al enviar. Intentá de nuevo.');
      setBtn(null);
    } finally { setLoading(false); }
  }

  return (
    <div className="fp">
      <h3>Quiero que gestionen mi activo</h3>
      <p>Completá el formulario y un asesor te contactará para evaluar tu caso</p>
      <div className="fr">
        <div className="ff"><label>Nombre completo <span>*</span></label><input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Tu nombre" /></div>
        <div className="ff"><label>Correo electrónico <span>*</span></label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@email.com" /></div>
      </div>
      <div className="fr">
        <div className="ff"><label>Teléfono <span>*</span></label><input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+506 8572-5465" /></div>
        <div className="ff">
          <label>¿Qué querés gestionar? <span>*</span></label>
          <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="">Seleccioná una opción</option>
            <option>Propiedad</option>
            <option>Vehículo</option>
            <option>Crédito INVU</option>
          </select>
        </div>
      </div>
      <div className="ff" style={{ marginBottom: '1.5rem' }}>
        <label>Descripción del activo</label>
        <textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Ej: Casa de 3 habitaciones en Escazú, 180 m², valor aprox $250,000..." />
      </div>
      <button className="btn-send" onClick={handleSubmit} disabled={loading}>
        {btn || 'Quiero que gestionen mi activo'} <i className="fas fa-arrow-right" />
      </button>
    </div>
  );
}
