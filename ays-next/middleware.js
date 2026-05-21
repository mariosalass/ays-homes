import { NextResponse } from 'next/server';

const FICHA_HOSTS = new Set([
  'cr-prop-fichas.fyi',
  'www.cr-prop-fichas.fyi',
]);

const NEUTRAL_404 = `<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Ficha no disponible</title>
    <style>
      body{margin:0;min-height:100vh;display:grid;place-items:center;background:#f8fafc;color:#0f172a;font-family:Arial,sans-serif}
      main{max-width:420px;padding:32px;text-align:center}
      h1{margin:0 0 10px;font-size:24px;line-height:1.2}
      p{margin:0;color:#64748b;line-height:1.6}
    </style>
  </head>
  <body>
    <main>
      <h1>Ficha no disponible</h1>
      <p>Este enlace no est&aacute; disponible o fue escrito incorrectamente.</p>
    </main>
  </body>
</html>`;

export function middleware(request) {
  const host = request.headers.get('host') || '';
  const hostname = host.split(':')[0].toLowerCase();

  if (!FICHA_HOSTS.has(hostname)) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;
  const isAllowed =
    pathname.startsWith('/ficha/') ||
    pathname.startsWith('/_next/') ||
    pathname === '/favicon.ico' ||
    pathname === '/favicon.svg';

  if (isAllowed) {
    return NextResponse.next();
  }

  return new NextResponse(NEUTRAL_404, {
    status: 404,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'x-robots-tag': 'noindex',
    },
  });
}
