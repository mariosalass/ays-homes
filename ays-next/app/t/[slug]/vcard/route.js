import { getCard, SITE_URL } from '@/lib/cards';

export function GET(_req, { params }) {
  const c = getCard(params.slug);
  if (!c) return new Response('No encontrado', { status: 404 });

  const [first, ...rest] = c.name.split(' ');
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${rest.join(' ')};${first};;;`,
    `FN:${c.name}`,
    `ORG:${c.company}`,
    `TITLE:${c.role}`,
    `TEL;TYPE=CELL:${c.phone}`,
    `EMAIL:${c.email}`,
    `URL:${SITE_URL}`,
    'END:VCARD',
  ];
  return new Response(lines.join('\r\n'), {
    headers: {
      'content-type': 'text/vcard; charset=utf-8',
      'content-disposition': `attachment; filename="${params.slug}.vcf"`,
      'x-robots-tag': 'noindex',
    },
  });
}
