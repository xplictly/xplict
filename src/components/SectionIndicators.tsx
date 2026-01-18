import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const sections = ['home', 'projects', 'about', 'contact'];

export const SectionIndicators = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200);

      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 20 }}
      transition={{ duration: 0.3 }}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3"
    >
      {sections.map((section) => (
        <button
          key={section}
          onClick={() => scrollToSection(section)}
          className="group relative flex items-center justify-end"
        >
          <span className="absolute right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs text-muted-foreground capitalize whitespace-nowrap">
            {section}
          </span>
          <motion.div
            className={`w-2 h-2 rounded-full transition-colors duration-200 ${
              activeSection === section 
                ? 'bg-foreground' 
                : 'bg-muted-foreground/30 group-hover:bg-muted-foreground'
            }`}
            animate={{
              scale: activeSection === section ? 1.5 : 1,
            }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          />
        </button>
      ))}
    </motion.div>
  );
};
