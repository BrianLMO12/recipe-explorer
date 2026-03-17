import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { Utensils } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import MagneticButton from './MagneticButton';
import '../styles/Navbar.css';

export default function Navbar() {
  const location = useLocation();
  const [apiStatus, setApiStatus] = useState('online');
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    try {
      const s = localStorage.getItem('api_status') || 'online';
      setApiStatus(s);
    } catch (e) {
      setApiStatus('online');
    }
    const onStorage = () => {
      try {
        setApiStatus(localStorage.getItem('api_status') || 'online');
      } catch (e) { }
    };
    window.addEventListener('storage', onStorage);
    const interval = setInterval(onStorage, 2000);
    return () => {
      window.removeEventListener('storage', onStorage);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollThreshold = 50; // Only apply hide/show after scrolling 50px

      if (currentScrollY > scrollThreshold) {
        if (currentScrollY > lastScrollYRef.current) {
          // Scrolling down
          setIsHidden(true);
        } else {
          // Scrolling up
          setIsHidden(false);
        }
      } else {
        // Near top of page, always show
        setIsHidden(false);
      }

      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`navbar ${isHidden ? 'navbar-hidden' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <Utensils size={28} />
          <span>RecipeExplorer</span>
        </Link>

        <div className="navbar-links">
          <Link
            to="/"
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
          >
            Explore
          </Link>
          <Link
            to="/favorites"
            className={`nav-link ${isActive('/favorites') ? 'active' : ''}`}
          >
            Favorites
          </Link>
        </div>

        <div className="navbar-actions">
          {apiStatus === 'fallback' && (
            <div className="api-badge" title="Recipe API unreachable — showing local samples">
              API Offline
            </div>
          )}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
