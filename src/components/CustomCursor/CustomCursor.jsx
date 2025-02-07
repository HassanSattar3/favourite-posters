import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './CustomCursor.css';

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      if (e.target.closest('a') || e.target.closest('button') || e.target.closest('.hoverable')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      <motion.div
        className="cursor"
        animate={{
          x: mousePosition.x - 5,
          y: mousePosition.y - 5,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          damping: 30,
          mass: 0.5,
          stiffness: 400
        }}
      />
      <motion.div
        className="cursor-ring"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: isHovering ? 1.2 : 1,
        }}
        transition={{
          type: "spring",
          damping: 25,
          mass: 0.8,
          stiffness: 350
        }}
      />
    </>
  );
}
