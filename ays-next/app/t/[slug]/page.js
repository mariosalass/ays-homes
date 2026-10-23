import { notFound } from 'next/navigation';
import { getCard, SOCIALS, SITE_URL } from '@/lib/cards';
import './card.css';

export function generateMetadata({ params }) {
  const c = getCard(params.slug);
  if (!c) return { robots: { index: false, follow: false } };
  return {
    title: `${c.name} · ${c.company}`,
    description: `${c.role} en ${c.company}. Contactame por WhatsApp, llamada o correo.`,
    robots: { index: false, follow: false, nocache: true },
    alternates: { canonical: null },
    openGraph: { title: c.name, description: `${c.role} · ${c.company}`, images: [c.photo] },
  };
}

export default function TarjetaPage({ params }) {
  const c = getCard(params.slug);
  if (!c) notFound();

  const wa = `https://wa.me/${c.phone.replace('+', '')}?text=${encodeURIComponent('Hola ' + c.name.split(' ')[0] + ', vi tu tarjeta y quisiera más información.')}`;

  return (
    <main className="tj">
      <div className="tj-card">
        <div className="tj-top" />
        <img className="tj-photo" src={c.photo} alt={c.name} />
        <h1>{c.name}</h1>
        <p className="tj-role">{c.role}</p>
        <p className="tj-co">{c.company}</p>
        <p className="tj-bio">{c.bio}</p>

        <div className="tj-btns">
          <a className="tj-btn wa" href={wa} target="_blank" rel="noopener noreferrer"><i className="fab fa-whatsapp" /> WhatsApp</a>
          <a className="tj-btn" href={`tel:${c.phone}`}><i className="fas fa-phone" /> {c.phoneDisplay}</a>
          <a className="tj-btn" href={`mailto:${c.email}`}><i className="fas fa-envelope" /> {c.email}</a>
          <a className="tj-btn" href={SITE_URL} target="_blank" rel="noopener noreferrer"><i className="fas fa-globe" /> www.ays.homes</a>
          <a className="tj-btn gold" href={`/t/${params.slug}/vcard`}><i className="fas fa-address-book" /> Guardar contacto</a>
        </div>

        <div className="tj-soc">
          {SOCIALS.map((s) => (
            <a key={s.icon} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.label}><i className={`fab fa-${s.icon}`} /></a>
          ))}
        </div>
      </div>
    </main>
  );
}
