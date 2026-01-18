import { motion } from 'framer-motion';

interface Skill {
  name: string;
  level: number; // 0-100
}

const skills: Skill[] = [
  { name: 'C++', level: 90 },
  { name: 'TypeScript', level: 85 },
  { name: 'Python', level: 80 },
  { name: 'React', level: 85 },
  { name: 'Algorithms', level: 88 },
  { name: 'Kotlin', level: 70 },
];

export const SkillsRadar = () => {
  const centerX = 150;
  const centerY = 150;
  const maxRadius = 120;
  const levels = 4;

  const getPointPosition = (index: number, level: number) => {
    const angle = (Math.PI * 2 * index) / skills.length - Math.PI / 2;
    const radius = (level / 100) * maxRadius;
    return {
      x: centerX + Math.cos(angle) * radius,
      y: centerY + Math.sin(angle) * radius,
    };
  };

  const getLabelPosition = (index: number) => {
    const angle = (Math.PI * 2 * index) / skills.length - Math.PI / 2;
    const radius = maxRadius + 25;
    return {
      x: centerX + Math.cos(angle) * radius,
      y: centerY + Math.sin(angle) * radius,
    };
  };

  const polygonPoints = skills
    .map((skill, i) => {
      const pos = getPointPosition(i, skill.level);
      return `${pos.x},${pos.y}`;
    })
    .join(' ');

  return (
    <div className="relative w-full max-w-[320px] mx-auto">
      <svg viewBox="0 0 300 300" className="w-full h-full">
        {/* Background circles */}
        {Array.from({ length: levels }).map((_, i) => (
          <motion.circle
            key={i}
            cx={centerX}
            cy={centerY}
            r={(maxRadius / levels) * (i + 1)}
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="1"
            strokeOpacity={0.3}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          />
        ))}

        {/* Axis lines */}
        {skills.map((_, i) => {
          const endPos = getPointPosition(i, 100);
          return (
            <motion.line
              key={i}
              x1={centerX}
              y1={centerY}
              x2={endPos.x}
              y2={endPos.y}
              stroke="hsl(var(--border))"
              strokeWidth="1"
              strokeOpacity={0.2}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.3 + i * 0.05, duration: 0.5 }}
            />
          );
        })}

        {/* Skill polygon */}
        <motion.polygon
          points={polygonPoints}
          fill="hsl(var(--foreground) / 0.1)"
          stroke="hsl(var(--foreground))"
          strokeWidth="2"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Skill points */}
        {skills.map((skill, i) => {
          const pos = getPointPosition(i, skill.level);
          return (
            <motion.circle
              key={i}
              cx={pos.x}
              cy={pos.y}
              r={5}
              fill="hsl(var(--background))"
              stroke="hsl(var(--foreground))"
              strokeWidth="2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6 + i * 0.05, type: 'spring', damping: 15 }}
            />
          );
        })}

        {/* Labels */}
        {skills.map((skill, i) => {
          const pos = getLabelPosition(i);
          return (
            <motion.text
              key={i}
              x={pos.x}
              y={pos.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-foreground/80 text-xs font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 + i * 0.05, duration: 0.3 }}
            >
              {skill.name}
            </motion.text>
          );
        })}
      </svg>

      {/* Animated pulse in center */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-foreground/20"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.1, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
};
