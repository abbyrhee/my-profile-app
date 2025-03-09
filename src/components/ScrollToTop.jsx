import { useRef, useLayoutEffect, useState } from 'react';
import '../styles/ScrollToTop.css';

const ScrollToTop = () => {
  const buttonRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    // Show button when scrolled 100px
    const scrolled = window.scrollY > 100;
    if (scrolled !== isVisible) {
      setIsVisible(scrolled);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Using useLayoutEffect instead of useEffect to prevent any visual flickering
  // when calculating button visibility
  useLayoutEffect(() => {
    // Check initial scroll position synchronously before browser paint
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible]);

  return (
    <button
      ref={buttonRef}
      className={`scroll-to-top ${isVisible ? 'visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      ↑
    </button>
  );
};

export default ScrollToTop;
