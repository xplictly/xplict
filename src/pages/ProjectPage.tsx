import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { projects, BADGES } from '@/data/portfolio';
import { SpotlightCursor } from '@/components/SpotlightCursor';
import { CustomCursor } from '@/components/CustomCursor';

const ProjectPage = () => {
  const { id } = useParams<{ id: string }>();
  const project = projects.find(p => p.id === id);

  if (!project) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.4, ease: "circOut" }}
        className="min-h-screen flex items-center justify-center bg-background text-foreground"
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <Link to="/" className="text-muted-foreground hover:text-foreground underline">Return Home</Link>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.4, ease: "circOut" }}
      className="min-h-screen bg-background text-foreground cursor-none selection:bg-foreground/20 selection:text-foreground"
    >
      <SpotlightCursor />
      <CustomCursor />
      
      <div className="max-w-4xl mx-auto px-6 py-24 md:px-12 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-12">
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </Link>

          <div className="mb-8">
            <span className="text-sm font-mono text-foreground/60 uppercase tracking-wider">{project.category}</span>
            <h1 className="font-serif-display text-5xl md:text-7xl font-bold mt-4 mb-6">{project.name}</h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              {project.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 mb-12 pb-12 border-b border-border/30">
            <a 
              href={project.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-full font-medium hover:bg-foreground/90 transition-all"
            >
              View Repository <ExternalLink size={18} />
            </a>
            
            <div className="flex items-center gap-3 px-6 py-3 bg-secondary rounded-full">
              <span className="text-sm font-medium">Tech:</span>
              <span className="text-sm text-muted-foreground">{project.tech}</span>
            </div>
            
            <div className="flex items-center gap-2 px-4 py-3 bg-secondary rounded-full">
              {project.badges?.map((b: string) => (
                <div key={b} className="w-6 h-6 rounded-full bg-background flex items-center justify-center border border-border/20" title={b}>
                  <img src={BADGES[b]} alt={b} className="w-3.5 h-3.5" />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-12">
            <section>
              <h2 className="font-serif-display text-3xl font-bold mb-6">Specific Approach</h2>
              <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                {project.approach}
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProjectPage;
