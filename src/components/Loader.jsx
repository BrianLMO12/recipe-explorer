import { motion } from 'framer-motion';
import '../styles/Loader.css';

export default function Loader({ count = 12 }) {
  return (
    <div className="loader-grid">
      {[...Array(count)].map((_, index) => (
        <motion.div
          key={index}
          className="skeleton-card"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: index * 0.05,
          }}
        >
          <div className="skeleton-image" />
          <div className="skeleton-content">
            <div className="skeleton-line skeleton-title" />
            <div className="skeleton-line skeleton-text" />
            <div className="skeleton-line skeleton-footer" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
