import { motion } from 'framer-motion';
import { BookOpen, Brain, Target } from 'lucide-react';

export const LearningPath = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-card rounded-2xl md:rounded-3xl p-8 md:p-12"
    >
      <div className="grid md:grid-cols-3 gap-8">
        {/* Currently Reading */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <BookOpen size={24} className="text-foreground" />
            <h3 className="font-serif-display text-xl text-foreground">Currently Reading</h3>
          </div>
          <div className="space-y-3">
            <div className="bg-secondary rounded-lg p-4">
              <p className="text-foreground font-medium">Geronimo Stilton</p>
              <p className="text-sm text-muted-foreground mt-1">Around the World in 80 Days</p>
              <p className="text-xs text-muted-foreground/60 mt-2">Re-reading for the adventure</p>
            </div>
          </div>
        </div>

        {/* Learning Path */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Brain size={24} className="text-foreground" />
            <h3 className="font-serif-display text-xl text-foreground">Learning Path</h3>
          </div>
          <div className="space-y-2">
            {['MySQL', 'Algorithms', 'APIs'].map((item) => (
              <motion.div
                key={item}
                whileHover={{ x: 4 }}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-default"
              >
                <div className="w-2 h-2 bg-foreground rounded-full" />
                <span>{item}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Focus Areas */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Target size={24} className="text-foreground" />
            <h3 className="font-serif-display text-xl text-foreground">Current Focus</h3>
          </div>
          <div className="space-y-2">
            {['Final Exams', 'LeetCode Questions'].map((item) => (
              <motion.div
                key={item}
                whileHover={{ x: 4 }}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-default"
              >
                <div className="w-2 h-2 bg-foreground rounded-full" />
                <span>{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
