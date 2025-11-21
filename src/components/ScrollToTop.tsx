import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ScrollToTopProps {
  isAuthenticated?: boolean;
  showProgress?: boolean;
}

export function ScrollToTop({ 
  isAuthenticated = false,
  showProgress = true 
}: ScrollToTopProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Show button when page is scrolled down and calculate progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      
      setScrollProgress(scrollPercent);
      
      if (scrollTop > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial call to set progress
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Position based on authentication state with responsive design
  // Desktop: Position changes based on chat widget
  // Mobile: Always bottom-right for consistency
  const getPositionClasses = () => {
    if (isAuthenticated) {
      // Chat widget is on right, so button goes slightly left on desktop
      return 'right-4 md:right-20 lg:right-24';
    } else {
      // Chat widget is on left (visitor), button stays right
      return 'right-4';
    }
  };

  // Responsive sizing - slightly smaller
  const sizeClasses = 'w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          className={`fixed bottom-6 md:bottom-8 ${getPositionClasses()} z-[95]`}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className={`relative ${sizeClasses} bg-gradient-to-br from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center group`}
            aria-label="উপরে যান"
            title="উপরে যান / Scroll to Top"
          >
            {/* Scroll Progress Circle */}
            {showProgress && (
              <svg 
                className="absolute inset-0 -rotate-90 w-full h-full"
                viewBox="0 0 100 100"
              >
                {/* Background circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.2)"
                  strokeWidth="3"
                />
                {/* Progress circle */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.9)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: scrollProgress / 100 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    strokeDasharray: `${2 * Math.PI * 45}`,
                  }}
                />
              </svg>
            )}

            {/* Arrow Icon with bounce animation */}
            <motion.div
              className="relative z-10"
              animate={{
                y: [0, -2, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5" strokeWidth={2.5} />
            </motion.div>
            
            {/* Pulse ring animation */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-emerald-300 opacity-0 group-hover:opacity-100"
              animate={{
                scale: [1, 1.3, 1.3],
                opacity: [0.6, 0, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeOut"
              }}
            />

            {/* Glow effect on hover */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-300" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
