import { motion } from 'framer-motion';
import { Monitor, Code2, Zap, Database } from 'lucide-react';

interface UseItem {
  category: string;
  icon: React.ReactNode;
  items: { name: string; description: string }[];
}

export const UsesStack = () => {
  const uses: UseItem[] = [
    {
      category: 'Hardware',
      icon: <Monitor size={24} />,
      items: [
        {
          name: 'MacBook Air M4',
          description: 'Main development machine',
        },
      ],
    },
    {
      category: 'Editor & Tools',
      icon: <Code2 size={24} />,
      items: [
        { name: 'VS Code', description: 'Primary code editor' },
        { name: 'Cursor', description: 'AI-powered code assistant' },
        { name: 'AntiGravity', description: 'Design and prototyping' },
      ],
    },
    {
      category: 'Development',
      icon: <Zap size={24} />,
      items: [
        { name: 'Git & GitHub', description: 'Version control' },
        { name: 'Bun', description: 'Fast JavaScript runtime' },
        { name: 'Vite', description: 'Frontend build tool' },
        { name: 'Framer Motion', description: 'Animation library' },
      ],
    },
    {
      category: 'Languages & Frameworks',
      icon: <Database size={24} />,
      items: [
        { name: 'TypeScript', description: 'Type-safe JavaScript' },
        { name: 'React', description: 'UI library' },
        { name: 'C++', description: 'Systems programming' },
        { name: 'Node.js', description: 'Backend runtime' },
        { name: 'MySQL', description: 'Database management' },
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
      {uses.map((section) => (
        <motion.div
          key={section.category}
          variants={itemVariants}
          className="bg-card rounded-2xl p-8 border border-border/30"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="text-foreground">{section.icon}</div>
            <h3 className="font-serif-display text-xl text-foreground">{section.category}</h3>
          </div>
          <div className="space-y-4">
            {section.items.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ x: 4 }}
                className="border-l-2 border-foreground/20 pl-4"
              >
                <h4 className="font-medium text-foreground">{item.name}</h4>
                <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};
