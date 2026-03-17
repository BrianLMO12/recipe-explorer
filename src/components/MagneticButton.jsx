import { useRef, useEffect } from 'react';
import '../styles/MagneticButton.css';

export default function MagneticButton({ children, onClick, className = '', disabled = false }) {
  const ref = useRef(null);

  useEffect(() => {
    const button = ref.current;
    if (!button) return;

    const handleMouseMove = (e) => {
      if (disabled) return;

      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;

      // Magnetic effect - move button toward cursor
      const moveX = (distX * 0.15);
      const moveY = (distY * 0.15);

      button.style.transform = `translate(${moveX}px, ${moveY}px)`;
    };

    const handleMouseLeave = () => {
      button.style.transform = 'translate(0px, 0px)';
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [disabled]);

  return (
    <button
      ref={ref}
      onClick={onClick}
      className={`magnetic-button ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
