import { createClient } from '@supabase/supabase-js';

export default async function sitemap() {
  let listings = [];
  try {
    const sb = createClient(
      process.env.NEXT_PUBLIC_SB_URL,
      process.env.NEXT_PUBLIC_SB_KEY
    );
    const { data } = await sb.from('listings').select('id, kind, updated_at');
    listings = (data || []).map((item) => ({
      url: `https://ays.homes/${item.kind === 'property' ? 'propiedad' : 'vehiculo'}/${item.id}`,
      lastModified: item.updated_at,
      changeFrequency: 'weekly',
      priority: 0.8,
    }));
  } catch {}

  return [
    { url: 'https://ays.homes',             priority: 1.0 },
    { url: 'https://ays.homes/propiedades',  priority: 0.9 },
    { url: 'https://ays.homes/autos',        priority: 0.7 },
    { url: 'https://ays.homes/nosotros',     priority: 0.5 },
    { url: 'https://ays.homes/creditos',     priority: 0.6 },
    { url: 'https://ays.homes/gestion',      priority: 0.6 },
    { url: 'https://ays.homes/contacto',     priority: 0.5 },
    ...listings,
  ];
}
