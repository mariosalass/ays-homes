'use client';
import { useState, useRef } from 'react';

const SERVICE_ID = 'service_myh633o';
const TEMPLATE_ID = 'template_1mf0628';
const PUBLIC_KEY  = 'GZjKIJ2FxGHEJeCdF';

export default function ContactForm() {
  const [name, setName]       = useState('');
  const [email, setEmail]     = useState('');
  const [phone, setPhone]     = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [btnText, setBtnText] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name || !email || !phone || !subject) {
      alert('Por favor completá nombre, correo, teléfono y motivo.');
      return;
    }
    setLoading(true);
    setBtnText('Enviando...');

    try {
      const emailjs = (await import('@emailjs/browser')).default;
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        from_name: name, from_email: email, phone, subject, message: message || '(Sin mensaje)',
      }, PUBLIC_KEY);
      setBtnText('¡Mensaje enviado!');
      setName(''); setEmail(''); setPhone(''); setSubject(''); setMessage('');
      setTimeout(() => setBtnText(null), 3000);
    } catch (err) {
      console.error('[EmailJS]', err);
      alert('Hubo un error al enviar. Intentá de nuevo.');
      setBtnText(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="cfb">
      <h3>Envianos un mensaje</h3>
      <p>Completá el formulario y te responderemos pronto</p>
      <div className="fr">
        <div className="ff"><label>Nombre completo <span>*</span></label><input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Tu nombre" /></div>
        <div className="ff"><label>Correo electrónico <span>*</span></label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@email.com" /></div>
      </div>
      <div className="fr">
        <div className="ff"><label>Teléfono / WhatsApp <span>*</span></label><input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+506 8572-5465" /></div>
        <div className="ff">
          <label>Motivo <span>*</span></label>
          <select value={subject} onChange={(e) => setSubject(e.target.value)}>
            <option value="">Seleccioná una opción</option>
            <option>Propiedades</option><option>Autos</option>
            <option>Créditos</option><option>Gestión</option><option>Otro</option>
          </select>
        </div>
      </div>
      <div className="ff" style={{ marginBottom: '1.5rem' }}>
        <label>Mensaje</label>
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Contanos en qué podemos ayudarte..." />
      </div>
      <button className="btn-send" onClick={handleSubmit} disabled={loading}>
        {btnText === '¡Mensaje enviado!'
          ? <><i className="fas fa-check" /> {btnText}</>
          : <><i className="fas fa-paper-plane" /> {btnText || 'Enviar mensaje'}</>
        }
      </button>
    </div>
  );
}
