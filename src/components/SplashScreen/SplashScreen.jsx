import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import './SplashScreen.css';

export function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      className="splash-screen"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.8, delay: 1.2, ease: "easeInOut" }}
      onAnimationComplete={() => setIsVisible(false)}
    >
      <motion.h1
        className="splash-screen__text"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        By: Hassan Sattar
      </motion.h1>
    </motion.div>
  );
}
