'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { href: '/',            label: 'Inicio' },
  { href: '/propiedades', label: 'Propiedades' },
  { href: '/autos',       label: 'Autos' },
  { href: '/creditos',    label: 'Créditos' },
  { href: '/gestion',     label: 'Gestión' },
  { href: '/nosotros',    label: 'Nosotros' },
  { href: '/contacto',    label: 'Contacto' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const isHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  const isScrolled = scrolled || !isHome;
  const navClass = [
    isScrolled ? 'scrolled' : 'dark',
    menuOpen ? 'menu-open' : '',
  ].filter(Boolean).join(' ');

  const isActive = (href) => href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <nav id="navbar" className={navClass}>
      <Link className="nav-brand" href="/">
        <div className="nav-logo">AyS</div>
        <div className="nav-brand-text">
          <span className="nb-h1">AyS</span>
          <span className="nb-p">Soluciones Comerciales</span>
        </div>
      </Link>

      <div className="nav-links">
        {NAV_LINKS.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`nav-link${isActive(href) ? ' active' : ''}`}
          >
            {label}
          </Link>
        ))}
      </div>

      <button
        className="nav-menu-btn"
        aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <i className={menuOpen ? 'fas fa-xmark' : 'fas fa-bars'} />
      </button>

      <Link href="/contacto" className="nav-cta">Contáctanos</Link>
    </nav>
  );
}
