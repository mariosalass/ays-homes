// Tarjetas de presentación digitales. Enlaces "invisibles": no aparecen en el
// menú, el sitemap ni buscadores (noindex), y el slug lleva un sufijo que no se adivina.
// Para agregar otra tarjeta, sumá una entrada acá.
export const SITE_URL = 'https://www.ays.homes';

export const CARDS = {
  'adrian-salas': {
    name: 'Adrián Salas',
    role: 'Agente Inmobiliario',
    company: 'AyS Soluciones Comerciales',
    photo: '/adrianfoto.jpg',
    phone: '+50685725465',
    phoneDisplay: '+506 8572-5465',
    email: 'info@ays.homes',
    bio: 'Te acompaño a comprar, vender o alquilar tu propiedad en Costa Rica, con trato cercano y transparente.',
  },
  'susy-bazo': {
    name: 'Susy Bazo',
    role: 'Agente Inmobiliaria',
    company: 'AyS Soluciones Comerciales',
    photo: '/susyfoto.jpg',
    phone: '+50683215948',
    phoneDisplay: '+506 8321-5948',
    email: 'info@ays.homes',
    bio: 'Te acompaño a comprar, vender o alquilar tu propiedad en Costa Rica, con trato cercano y transparente.',
  },
};

export const SOCIALS = [
  { icon: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/ays_soluciones_comerciales/' },
  { icon: 'facebook', label: 'Facebook', url: 'https://www.facebook.com/ayssolucionescomerciales' },
  { icon: 'tiktok', label: 'TikTok', url: 'https://www.tiktok.com/@ayssolucionescomerciales' },
];

export function getCard(slug) {
  return Object.prototype.hasOwnProperty.call(CARDS, slug) ? CARDS[slug] : null;
}
