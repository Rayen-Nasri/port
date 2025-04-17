"use client";
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';

// Import components dynamically
const HomePage = dynamic(() => import('./HomePage').then(mod => mod.HomePage), {
  ssr: false,
});

const Cards = dynamic(() => import('./Cards').then(mod => mod.Cards), {
  ssr: false,
});

const Ipad = dynamic(() => import('./Ipad').then(mod => mod.Ipad), {
  ssr: false,
});

const SkillsShowcase = dynamic(() => import('./SkillsShowcase').then(mod => mod.SkillsShowcase), {
  ssr: false,
});

const Footer = dynamic(() => import('./Footer').then(mod => mod.Footer), {
  ssr: false,
});

// Section data
const sections = [
  { id: 'home', Component: HomePage },
  { id: 'cards', Component: Cards },
  { id: 'ipad', Component: Ipad },
  { id: 'skills', Component: SkillsShowcase },
  { id: 'footer', Component: Footer },
];

// Animation variants
const pageVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0
  })
};

// Indicator dot variants
const dotVariants = {
  inactive: { scale: 1, opacity: 0.5 },
  active: { 
    scale: 1.5, 
    opacity: 1,
    transition: { type: 'spring', stiffness: 300, damping: 20 }
  },
};

export const ScrollSystem = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle wheel events for scrolling between sections with debounce
  useEffect(() => {
    let wheelTimer: NodeJS.Timeout | null = null;
    
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault(); // Prevent default scroll behavior
      
      if (isScrolling) return;
      
      // Clear any existing timer
      if (wheelTimer) clearTimeout(wheelTimer);
      
      // Set a small debounce to prevent rapid firing
      wheelTimer = setTimeout(() => {
        // Determine scroll direction
        const newDirection = e.deltaY > 0 ? 1 : -1;
        
        // Calculate next section index
        const nextSection = currentSection + newDirection;
        
        // Check if next section is valid
        if (nextSection >= 0 && nextSection < sections.length) {
          setDirection(newDirection);
          setCurrentSection(nextSection);
          setIsScrolling(true);
          
          // Reset scrolling state after animation completes
          setTimeout(() => {
            setIsScrolling(false);
          }, 1000); // Match this with your animation duration
        }
      }, 50); // Small debounce time
    };

    const currentContainer = containerRef.current;
    if (currentContainer) {
      currentContainer.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (currentContainer) {
        currentContainer.removeEventListener('wheel', handleWheel);
      }
      if (wheelTimer) clearTimeout(wheelTimer);
    };
  }, [currentSection, isScrolling]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrolling) return;
      
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        if (currentSection < sections.length - 1) {
          setDirection(1);
          setCurrentSection(currentSection + 1);
          setIsScrolling(true);
          setTimeout(() => setIsScrolling(false), 1000);
        }
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        if (currentSection > 0) {
          setDirection(-1);
          setCurrentSection(currentSection - 1);
          setIsScrolling(true);
          setTimeout(() => setIsScrolling(false), 1000);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSection, isScrolling]);

  // Navigate to a specific section
  const goToSection = (index: number) => {
    if (isScrolling || index === currentSection) return;
    
    setDirection(index > currentSection ? 1 : -1);
    setCurrentSection(index);
    setIsScrolling(true);
    setTimeout(() => setIsScrolling(false), 1000);
  };

  return (
    <div className="fixed inset-0 h-screen w-screen overflow-hidden" ref={containerRef}>
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[75px] bg-purple-500/20 opacity-30"></div>
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full blur-[75px] bg-blue-500/20 opacity-30"></div>
      </div>
      
      {/* Section navigation dots */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
        {sections.map((section, index) => (
          <motion.button
            key={section.id}
            className="w-3 h-3 rounded-full bg-white"
            variants={dotVariants}
            initial="inactive"
            animate={currentSection === index ? 'active' : 'inactive'}
            onClick={() => goToSection(index)}
            whileHover={{ scale: 1.8, opacity: 0.8 }}
            whileTap={{ scale: 1.4 }}
          />
        ))}
      </div>


      {/* Sections container */}
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={currentSection}
          custom={direction}
          variants={pageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          className="absolute inset-0 overflow-hidden"
        >
          <div className="w-full h-full flex items-center justify-center">
            {/* Render current section component */}
            {(() => {
              const { Component } = sections[currentSection];
              return <Component />;
            })()}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Scroll indicator for first section */}
      {currentSection === 0 && (
        <motion.div 
          className="absolute bottom-8 rotate-90 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <motion.div 
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
            animate={{ boxShadow: ['0 0 0px rgba(255,255,255,0.3)', '0 0 8px rgba(255,255,255,0.5)', '0 0 0px rgba(255,255,255,0.3)'] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div 
              className="w-1.5 h-1.5 bg-white rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};