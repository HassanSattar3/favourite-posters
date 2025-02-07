import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Navigation.css';

export function Navigation() {
  return (
    <motion.header
      className="navigation"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container navigation__container">
        <Link to="/" className="navigation__logo">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            BTA Poster
            <span className="navigation__logo-museum">Project</span>
          </motion.h1>
        </Link>
        <nav className="navigation__menu">
          <motion.div
            className="navigation__menu-items"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <a 
              href="https://github.com/HassanSattar3/favourite-posters" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="navigation__link navigation__link--special"
            >
              Source Code
            </a>
          </motion.div>
        </nav>
      </div>
    </motion.header>
  );
}
