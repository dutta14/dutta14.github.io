import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

interface NavbarProps {
  isDark: boolean;
  onToggleTheme: () => void;
  brandVisible: boolean;
  onBooking: () => void;
}

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#products', label: 'Work' },
  { href: '#experience', label: 'Experience' },
  { href: '#education', label: 'Education' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
];

const Navbar = ({ isDark, onToggleTheme, brandVisible, onBooking }: NavbarProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <nav className="navbar navbar-expand-lg sticky-top">
      <div className="container">
        <Link to="/" className={`navbar-brand${brandVisible ? ' show' : ''}`}>
          Anindya Dutta
        </Link>
        <div className="d-flex gap-2 align-items-center order-lg-last navbar-actions">
          <button
            className="navbar-toggler"
            type="button"
            aria-expanded={menuOpen}
            aria-label="Toggle navigation"
            onClick={() => setMenuOpen(o => !o)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <button
            className="theme-toggle"
            onClick={onToggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <i className={isDark ? 'fas fa-sun' : 'fas fa-moon'}></i>
          </button>
        </div>
        <div className={`collapse navbar-collapse${menuOpen ? ' show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {navLinks.map((link) => (
              <li className="nav-item" key={link.href}>
                {isHome ? (
                  <a className="nav-link" href={link.href} onClick={() => setMenuOpen(false)}>
                    {link.label}
                  </a>
                ) : (
                  <Link className="nav-link" to={`/${link.href}`} onClick={() => setMenuOpen(false)}>
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <button className="nav-cta" onClick={() => { setMenuOpen(false); onBooking(); }}>
            Book 30 Minutes
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
