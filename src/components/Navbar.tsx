import '../styles/Navbar.css';

interface NavbarProps {
  isDark: boolean;
  onToggleTheme: () => void;
  brandVisible: boolean;
  onBooking: () => void;
}

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#experience', label: 'Experience' },
  { href: '#education', label: 'Education' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
];

const Navbar = ({ isDark, onToggleTheme, brandVisible, onBooking }: NavbarProps) => (
  <nav className="navbar navbar-expand-lg sticky-top">
    <div className="container">
      <span className={`navbar-brand${brandVisible ? ' show' : ''}`}>
        Anindya Dutta
      </span>
      <div className="d-flex gap-2 align-items-center order-lg-last navbar-actions">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
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
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          {navLinks.map((link) => (
            <li className="nav-item" key={link.href}>
              <a className="nav-link" href={link.href}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <button className="nav-cta" onClick={onBooking}>
          Book an Appointment
        </button>
      </div>
    </div>
  </nav>
);

export default Navbar;
