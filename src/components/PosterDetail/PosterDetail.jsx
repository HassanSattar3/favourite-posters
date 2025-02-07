import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { posters } from '../../data/posters';
import './PosterDetail.css';

export function PosterDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const poster = posters.find(p => p.id === parseInt(id));

  if (!poster) {
    return <div>Poster not found</div>;
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      navigate('/');
    }
  };

  return (
    <motion.div
      className="poster-detail"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <Link to="/" className="poster-detail__close" aria-label="Close">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          ✕
        </motion.div>
      </Link>

      <div className="poster-detail__content">
        <motion.div
          className="poster-detail__image-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <img
            src={`/favourite-posters${poster.image}`}
            alt={`${poster.company} - ${poster.title}`}
            className="poster-detail__image"
          />
        </motion.div>

        <motion.div
          className="poster-detail__info"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="poster-detail__header">
            <h1 className="poster-detail__title">{poster.title}</h1>
            <div className="poster-detail__meta">
              <span className="poster-detail__company">{poster.company}</span>
              <span className="poster-detail__year">{poster.year}</span>
            </div>
          </div>

          <div className="poster-detail__description">
            <p>{poster.description}</p>
          </div>

          <motion.div
            className="poster-detail__navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {id > 1 && (
              <Link
                to={`/poster/${parseInt(id) - 1}`}
                className="poster-detail__nav-link poster-detail__nav-link--prev"
              >
                Previous
              </Link>
            )}
            {id < posters.length && (
              <Link
                to={`/poster/${parseInt(id) + 1}`}
                className="poster-detail__nav-link poster-detail__nav-link--next"
              >
                Next
              </Link>
            )}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
