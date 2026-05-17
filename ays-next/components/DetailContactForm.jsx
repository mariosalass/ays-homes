'use client';
import { useState } from 'react';

const SERVICE_ID = 'service_myh633o';
const TEMPLATE_ID = 'template_1mf0628';
const PUBLIC_KEY  = 'GZjKIJ2FxGHEJeCdF';

const WA_NUMBERS = ['50685725465', '50683215948'];

export default function DetailContactForm({ item }) {
  const [name, setName]       = useState('');
  const [email, setEmail]     = useState('');
  const [phone, setPhone]     = useState('');
  const [message, setMessage] = useState('');
  const [btnText, setBtnText] = useState(null);
  const [btnBg, setBtnBg]     = useState('');
  const [loading, setLoading] = useState(false);

  const isProperty = item.kind === 'property';
  const isBusiness = item.kind === 'business';
  const label = isProperty ? 'Agendar una visita' : isBusiness ? 'Consultar sobre este negocio' : 'Agendar prueba de manejo';

  async function handleSubmit() {
    if (!name || !email || !phone) {
      alert('Por favor completá nombre, correo y teléfono.');
      return;
    }
    setLoading(true);
    setBtnText('Enviando...');
    setBtnBg('');

    try {
      const emailjs = (await import('@emailjs/browser')).default;
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        from_name: name, from_email: email, phone,
        subject: `Consulta sobre: ${item.title || 'publicación'}`,
        message: message || '(Sin mensaje)',
      }, PUBLIC_KEY);
      setBtnBg('#16a34a');
      setBtnText('¡Mensaje enviado!');
      setName(''); setEmail(''); setPhone(''); setMessage('');
      setTimeout(() => { setBtnText(null); setBtnBg(''); }, 3000);
    } catch (err) {
      console.error('[EmailJS]', err);
      setBtnBg('#dc2626');
      setBtnText('Error al enviar');
      setTimeout(() => { setBtnText(null); setBtnBg(''); }, 3000);
    } finally {
      setLoading(false);
    }
  }

  function openWA() {
    const n = WA_NUMBERS[Math.floor(Math.random() * WA_NUMBERS.length)];
    const noun = isProperty ? 'propiedad' : isBusiness ? 'negocio' : 'vehículo';
    const msg = `Me interesa más información sobre este ${noun}: ${window.location.href}`;
    const url = `https://wa.me/${n}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  return (
    <div className="fcard">
      <h3><i className="fas fa-calendar-check" /> {label}</h3>
      <input className="fi" type="text" placeholder="Nombre completo" value={name} onChange={(e) => setName(e.target.value)} />
      <input className="fi" type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input className="fi" type="tel" placeholder="Teléfono / WhatsApp" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <textarea className="fi fita" placeholder="Mensaje (opcional)" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button
        className="btn-fm"
        onClick={handleSubmit}
        disabled={loading}
        style={btnBg ? { background: btnBg } : {}}
      >
        {btnText || 'Solicitar información'}
      </button>
      <button className="btn-fwa" onClick={openWA}>
        <i className="fab fa-whatsapp" /> Hablar por WhatsApp
      </button>
    </div>
  );
}
