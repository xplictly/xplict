import { motion } from 'framer-motion';
import { FileText, ArrowUpRight } from 'lucide-react';

export const ResumeSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-card rounded-2xl md:rounded-3xl p-8 md:p-12 border-2 border-dashed border-border/50"
    >
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="mb-6 p-4 bg-secondary rounded-full">
          <FileText size={32} className="text-foreground" />
        </div>
        
        <h3 className="font-serif-display text-3xl md:text-4xl text-foreground mb-3">
          Resume/CV
        </h3>
        
        <p className="text-muted-foreground max-w-md mb-8">
          Currently crafting my resume to showcase my projects, experience, and skills. 
          Check back soon or reach out directly!
        </p>

        <motion.a
          href="mailto:maanasnk@yahoo.com"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-lg font-medium hover:bg-foreground/90 transition-colors"
        >
          Ask me directly
          <ArrowUpRight size={18} />
        </motion.a>
      </div>
    </motion.div>
  );
};
