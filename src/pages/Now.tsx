import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { nowData } from '@/data/portfolio';
import { SpotlightCursor } from '@/components/SpotlightCursor';
import { CustomCursor } from '@/components/CustomCursor';

const Now = () => {
  return (
    <div className="min-h-screen bg-background text-foreground cursor-none">
      <SpotlightCursor />
      <CustomCursor />

      <div className="max-w-3xl mx-auto px-6 py-24 md:px-12 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-12">
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </Link>

          <h1 className="font-serif-display text-6xl md:text-7xl font-bold mb-6">What I'm doing now</h1>
          <p className="text-xl text-muted-foreground mb-12 pb-12 border-b border-border/30">
            This is a <a href="https://nownownow.com/about" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">now page</a>. 
            It's a big picture view of what I'm focused on at this point in my life.
          </p>

          <div className="space-y-12">
            <section>
              <h2 className="font-mono text-sm uppercase tracking-wider text-foreground/60 mb-4">Current Status</h2>
              <p className="text-2xl font-medium">{nowData.status}</p>
            </section>

            <section>
              <h2 className="font-mono text-sm uppercase tracking-wider text-foreground/60 mb-4">Building</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">{nowData.building}</p>
            </section>

            <section>
              <h2 className="font-mono text-sm uppercase tracking-wider text-foreground/60 mb-4">Learning</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">{nowData.learning}</p>
            </section>

            <section className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="font-mono text-sm uppercase tracking-wider text-foreground/60 mb-4">Reading</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">{nowData.reading}</p>
              </div>
              <div>
                <h2 className="font-mono text-sm uppercase tracking-wider text-foreground/60 mb-4">Listening</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">{nowData.listening}</p>
              </div>
            </section>
          </div>
          
          <div className="mt-24 text-sm text-foreground/40 italic">
            Last updated: May 2026
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Now;
