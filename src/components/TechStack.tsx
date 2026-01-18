import { motion } from 'framer-motion';
import { Code2, Database, Globe, Zap } from 'lucide-react';

interface TechCategory {
  name: string;
  icon: React.ReactNode;
  items: string[];
}

export const TechStack = () => {
  const techCategories: TechCategory[] = [
    {
      name: 'Languages',
      icon: <Code2 size={20} />,
      items: ['C++', 'JavaScript', 'TypeScript', 'Python'],
    },
    {
      name: 'Frontend',
      icon: <Globe size={20} />,
      items: ['React', 'Tailwind CSS', 'Framer Motion', 'Vite'],
    },
    {
      name: 'Backend & Databases',
      icon: <Database size={20} />,
      items: ['Node.js', 'Express', 'MongoDB', 'MySQL'],
    },
    {
      name: 'Tools & Platforms',
      icon: <Zap size={20} />,
      items: ['Git', 'GitHub', 'VS Code', 'Docker', 'Postman'],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={containerVariants}
      className="grid md:grid-cols-2 gap-8"
    >
      {techCategories.map((category) => (
        <motion.div
          key={category.name}
          variants={itemVariants}
          className="bg-card rounded-2xl p-6 border border-border/30"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="text-foreground">{category.icon}</div>
            <h4 className="font-serif-display text-lg text-foreground">{category.name}</h4>
          </div>
          <div className="flex flex-wrap gap-3">
            {category.items.map((tech) => (
              <motion.span
                key={tech}
                whileHover={{ scale: 1.05, y: -2 }}
                className="px-4 py-2 bg-secondary rounded-full text-sm text-foreground/80 hover:text-foreground transition-colors cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};
