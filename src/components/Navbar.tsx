import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useActiveSection from '../hooks/useActiveSection';
import '../styles/Navbar.css';

interface NavbarProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onBooking: () => void;
}

const navLinks: { href: string; label: string; isRoute?: boolean }[] = [
  { href: '#home', label: 'About' },
  { href: '#products', label: 'Work' },
  { href: '#experience', label: 'Experience' },
  { href: '#writing', label: 'Writing' },
  { href: '/speaking', label: 'Speaking', isRoute: true },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
];

const sectionIds = navLinks.filter((link) => !link.isRoute).map((link) => link.href.slice(1));

const Navbar = ({ isDark, onToggleTheme, onBooking }: NavbarProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const activeSection = useActiveSection(sectionIds, isHome);
  const activeHref = isHome ? `#${activeSection}` : location.pathname;

  return (
    <nav className="navbar navbar-expand-lg sticky-top" aria-label="Main">
      <div className="container">
        {!menuOpen && (
          <button
            className="navbar-toggler"
            type="button"
            aria-expanded={menuOpen}
            aria-label="Open navigation"
            aria-controls="navbarNav"
            onClick={() => setMenuOpen(true)}
          >
            <svg width="22" height="16" viewBox="0 0 22 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <line x1="0" y1="1" x2="16" y2="1" />
              <line x1="0" y1="8" x2="22" y2="8" />
              <line x1="0" y1="15" x2="16" y2="15" />
            </svg>
          </button>
        )}
        <Link to="/" className="navbar-brand">
          Anindya Dutta
        </Link>
        <div className="d-flex gap-2 align-items-center order-lg-last navbar-actions">
          <button className="nav-cta nav-cta-outer" onClick={onBooking}>
            Book 30 Minutes
          </button>
          <button
            className="theme-toggle"
            onClick={onToggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <i className={isDark ? 'fas fa-sun' : 'fas fa-moon'}></i>
          </button>
        </div>
        {menuOpen && <div className="nav-overlay" onClick={() => setMenuOpen(false)} />}
        <div className={`collapse navbar-collapse${menuOpen ? ' show' : ''}`} id="navbarNav">
          <button
            className="navbar-toggler sidebar-close"
            type="button"
            aria-expanded={menuOpen}
            aria-label="Close navigation"
            onClick={() => setMenuOpen(false)}
          >
            <svg width="22" height="16" viewBox="0 0 22 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <line x1="0" y1="1" x2="16" y2="1" />
              <line x1="0" y1="8" x2="22" y2="8" />
              <line x1="0" y1="15" x2="16" y2="15" />
            </svg>
          </button>
          <button className="nav-cta nav-cta-inner" onClick={() => { setMenuOpen(false); onBooking(); }}>
            Book 30 Minutes
          </button>
          <ul className="navbar-nav">
            {navLinks.map((link) => {
              const isActive = link.href === activeHref;
              const className = `nav-link${isActive ? ' active' : ''}`;
              const ariaCurrent = isActive ? (link.isRoute ? 'page' : 'location') : undefined;
              return (
                <li className="nav-item" key={link.href}>
                  {link.isRoute ? (
                    <Link className={className} to={link.href} aria-current={ariaCurrent} onClick={() => setMenuOpen(false)}>
                      {link.label}
                    </Link>
                  ) : isHome ? (
                    <a className={className} href={link.href} aria-current={ariaCurrent} onClick={() => setMenuOpen(false)}>
                      {link.label}
                    </a>
                  ) : (
                    <Link className={className} to={`/${link.href}`} onClick={() => setMenuOpen(false)}>
                      {link.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
