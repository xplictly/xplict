import { motion, AnimatePresence } from 'framer-motion';

interface EasterEggOverlayProps {
  isActive: boolean;
  onClose: () => void;
}

export const EasterEggOverlay = ({ isActive, onClose }: EasterEggOverlayProps) => {
  const handleBackdropClick = (e: React.MouseEvent) => {
    // Only close if clicking the backdrop itself, not the video
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background cursor-pointer"
        >
          {/* Close button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            onClick={onClose}
            className="absolute top-6 right-6 text-muted-foreground hover:text-foreground transition-colors z-20"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </motion.button>

          {/* Subtle background gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-accent/5 pointer-events-none" />

          {/* Video container - cursor default to indicate it's interactive */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 150 }}
            className="relative z-10 w-full max-w-4xl px-6 cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video rounded-lg overflow-hidden border border-border/50 shadow-2xl">
              <iframe
                src="https://www.youtube.com/embed/7K-uLkzzwBQ?si=cnP1tv02EinAqSKT&autoplay=1"
                title="GTA San Andreas"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </motion.div>

          {/* Bottom text - also stops propagation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="relative z-10 mt-8 text-center px-6 cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-muted-foreground font-serif-display text-lg md:text-xl leading-relaxed">
              this game means a lot to me :)
              <br />
              <span className="text-foreground/60">
                hope you enjoy this cutscene from the game
              </span>
            </p>
          </motion.div>

          {/* Subtle decorative elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.03 }}
            transition={{ delay: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs tracking-[0.5em] uppercase text-foreground font-light pointer-events-none"
          >
            HESOYAM
          </motion.div>

          {/* Click hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-muted-foreground pointer-events-none"
          >
            click anywhere to close
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
