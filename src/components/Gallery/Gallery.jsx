import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { posters } from '../../data/posters';
import './Gallery.css';

export function Gallery() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <section className="gallery">
      <div className="container">
        <motion.h2
          className="gallery__title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Iconic Tech Posters
        </motion.h2>
        <motion.div
          className="gallery__subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p>A curated collection of influential advertising in technology</p>
        </motion.div>
        
        <motion.div
          className="gallery__grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {posters.map((poster) => (
            <motion.article
              key={poster.id}
              className="gallery__item hoverable"
              variants={itemVariants}
            >
              <Link to={`/poster/${poster.id}`} className="gallery__link">
                <div className="gallery__image-container">
                  <img
                    src={poster.image}
                    alt={`${poster.company} - ${poster.title}`}
                    className="gallery__image"
                  />
                  <motion.div 
                    className="gallery__overlay"
                    initial={false}
                    whileHover={{ opacity: 1 }}
                  >
                    <div className="gallery__overlay-content">
                      <h3 className="gallery__poster-title">{poster.title}</h3>
                      <p className="gallery__poster-company">{poster.company}</p>
                      <p className="gallery__poster-year">{poster.year}</p>
                      <span className="gallery__view-details">View Details</span>
                    </div>
                  </motion.div>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}