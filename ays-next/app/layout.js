import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], weight: ['300','400','500','600','700','800'] });

export const metadata = {
  title: 'AyS Soluciones Comerciales',
  description: 'Propiedades, autos y créditos en Costa Rica. Adrián Salas y Susy Bazo, agentes inmobiliarios.',
  openGraph: {
    title: 'AyS Soluciones Comerciales',
    description: 'Propiedades, autos y créditos en Costa Rica.',
    siteName: 'AyS Soluciones Comerciales',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
