import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { ArrowUpRight, ArrowRight, Github, Instagram, Mail, ExternalLink, ChevronUp, Copy, Check } from 'lucide-react';
import maanasAvatar from '@/assets/maanas-avatar.jpg';
import projectPathVisualizer from '@/assets/project-path-visualizer.jpg';
import projectF1Dashboard from '@/assets/project-f1-dashboard.jpg';
import projectCursedSnake from '@/assets/project-cursed-snake.jpg';
import projectDiscordUwu from '@/assets/project-discord-uwu.jpg';
import projectOsiris from '@/assets/project-osiris.jpg';
import projectF1Companion from '@/assets/project-f1-companion.jpg';
import { SpotlightCursor } from '@/components/SpotlightCursor';
import { CustomCursor } from '@/components/CustomCursor';
import { ContactForm } from '@/components/ContactForm';
import { EasterEggOverlay } from '@/components/EasterEggOverlay';
import { useKonamiCode } from '@/hooks/useKonamiCode';

// Animated counter component
const AnimatedCounter = ({ value, delay }: { value: number; delay: number }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const timer = setTimeout(() => {
      const duration = 2000;
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        setDisplayValue(Math.floor(value * progress));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      animate();
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return <>{displayValue}</>;
};


// Back to top button component
const BackToTopButton = ({ show }: { show: boolean }) => {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          onClick={handleClick}
          className="fixed bottom-8 right-8 z-40 p-3 bg-foreground text-background rounded-full hover:bg-foreground/90 transition-colors"
        >
          <ChevronUp size={24} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

const projects = [
  {
    name: 'Path Visualizer',
    description: 'Interactive pathfinding algorithm visualizer. Visualizes A*, Dijkstra and BFS for learning and debugging.',
    image: projectPathVisualizer,
    url: 'https://github.com/xplictly/path-visualizer',
    tech: 'JavaScript · React',
    category: 'Web',
    featured: true,
  },
  {
    name: 'Image Reko (iOS/macOS)',
    description: 'On-device image recognition for iOS and macOS—Swift app that demos CoreML workflows.',
    image: projectPathVisualizer, // placeholder until a dedicated asset is added
    url: 'https://github.com/xplictly/image-reko-ios-macos',
    tech: 'Swift · CoreML',
    category: 'Mobile',
    featured: true,
  },
  {
    name: 'Widget Wall',
    description: 'Modular widget wall — a set of small embeddable widgets and dashboard components (replaces F1 Dashboard).',
    image: projectF1Dashboard,
    url: 'https://github.com/xplictly/widget-wall',
    tech: 'TypeScript · React',
    category: 'Web',
    featured: true,
  },
  {
    name: 'F1 Companion',
    description: 'Companion app for F1 enthusiasts (mobile) with session info and simple tracking features.',
    image: projectF1Companion,
    url: 'https://github.com/xplictly/f1companion',
    tech: 'Kotlin · Mobile',
    category: 'Mobile',
  },
  {
    name: 'Cursed Snake',
    description: 'A playful, terminal-based snake variant built for learning game mechanics and Python scripting.',
    image: projectCursedSnake,
    url: 'https://github.com/xplictly/cursed-snake',
    tech: 'Python',
    category: 'Games',
  },
  {
    name: 'Discord-UwU',
    description: 'A small Discord bot with moderation and fun commands; republished from earlier work.',
    image: projectDiscordUwu,
    url: 'https://github.com/xplictly/Discord-UwU',
    tech: 'Node.js · Discord.js',
    category: 'Tools',
  },
];



const IntroScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 3500);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 4300);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
      initial={{ opacity: 1 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={`text-center ${isExiting ? 'animate-fade-out-up' : ''}`}>
        <h1
          className="font-serif-display text-6xl md:text-8xl lg:text-9xl text-foreground opacity-0 animate-fade-up-in"
          style={{ animationDelay: '200ms' }}
        >
          一期一会
        </h1>
        <p
          className="font-serif-display text-2xl md:text-3xl lg:text-4xl text-foreground/80 mt-6 opacity-0 animate-fade-up-in italic"
          style={{ animationDelay: '600ms' }}
        >
          Ichigo Ichie
        </p>
      </div>
    </motion.div>
  );
};

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);
  const [easterEggActive, setEasterEggActive] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { scrollYProgress } = useScroll();

  useKonamiCode(() => setEasterEggActive(true));

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setScrollProgress(latest);
    setShowBackToTop(latest > 0.1);
  });

  useEffect(() => {
    if (!showIntro) {
      const timer = setTimeout(() => setContentVisible(true), 100);
      return () => clearTimeout(timer);
    }
  }, [showIntro]);

  const copyToClipboard = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  const filteredProjects = selectedCategory
    ? projects.filter((p) => p.category === selectedCategory)
    : projects;

  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))];
  const featuredProject = projects.find((p) => p.featured);
  const stats = [
    { label: 'Projects', value: '6' },
    { label: 'LeetCode', value: '145+' },
    { label: 'Experience', value: '3+yrs' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground cursor-none">
      <AnimatePresence>
        {showIntro && <IntroScreen onComplete={() => setShowIntro(false)} />}
      </AnimatePresence>

      <EasterEggOverlay isActive={easterEggActive} onClose={() => setEasterEggActive(false)} />

      {!showIntro && (
        <>
          <SpotlightCursor />
          <CustomCursor />
          
          <BackToTopButton show={showBackToTop} />

          {/* Scroll Progress Bar */}
          <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-foreground origin-left z-50"
            style={{ scaleX: scrollProgress }}
          />

          <div className="relative">
            {/* Hero Section */}
            <section className="min-h-screen flex flex-col items-center justify-center px-6 md:px-12 relative overflow-hidden">
              {/* Background elements */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-foreground/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-foreground/10 rounded-full blur-3xl" />
              </div>

              <div className="relative z-10 max-w-5xl mx-auto text-center">
                {/* Avatar */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: contentVisible ? 1 : 0, scale: contentVisible ? 1 : 0.8 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="mb-12"
                >
                  <img
                    src={maanasAvatar}
                    alt="Maanas"
                    className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-2 border-foreground/30 mx-auto"
                  />
                </motion.div>

                {/* Main Heading - Animated Text */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: contentVisible ? 1 : 0, y: contentVisible ? 0 : 30 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="mb-8"
                >
                  <h1 className="font-serif-display text-5xl md:text-6xl lg:text-7xl font-bold leading-none mb-6">
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: contentVisible ? 1 : 0 }}
                      transition={{ duration: 1.5, delay: 0.3 }}
                    >
                      Building thoughtful tools & experiences.
                    </motion.span>
                  </h1>
                </motion.div>

                {/* Subtitle */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: contentVisible ? 1 : 0, y: contentVisible ? 0 : 20 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="mb-12"
                >
                  <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                    Developer & Creator building cool stuff from Bangalore. Building games, tools, and experiences
                    that are both beautiful and functional.
                  </p>
                </motion.div>

                {/* Quick Stats with Animated Counters */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: contentVisible ? 1 : 0, y: contentVisible ? 0 : 20 }}
                  transition={{ duration: 0.8, delay: 0.35 }}
                  className="mb-12 flex justify-center gap-12 md:gap-20"
                >
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                      {contentVisible && <AnimatedCounter value={6} delay={600} />}
                    </div>
                    <div className="text-sm text-muted-foreground">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                      {contentVisible && <AnimatedCounter value={145} delay={800} />}
                      <span>+</span>
                    </div>
                    <div className="text-sm text-muted-foreground">LeetCode</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                      {contentVisible && <AnimatedCounter value={3} delay={1000} />}
                      <span>+</span>
                    </div>
                    <div className="text-sm text-muted-foreground">Years</div>
                  </div>
                </motion.div>

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: contentVisible ? 1 : 0, y: contentVisible ? 0 : 20 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <a
                    href="#work"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-foreground text-background rounded-full font-medium hover:bg-foreground/90 transition-all group"
                  >
                    See my work
                    <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </a>
                </motion.div>
              </div>

              {/* Scroll Indicator */}
              <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex items-start justify-center p-2">
                  <div className="w-1 h-1.5 bg-foreground rounded-full animate-pulse" />
                </div>
              </motion.div>
            </section>

            {/* Work Section */}
            <section id="work" className="relative py-32 px-6 md:px-12 bg-background">
              <div className="max-w-7xl mx-auto">
                {/* Section Title */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8 }}
                  className="mb-20"
                >
                  <h2 className="font-serif-display text-6xl md:text-7xl font-bold mb-12">Featured Work</h2>

                  {/* Category Filter */}
                  <motion.div className="flex gap-4 flex-wrap">
                    {categories.map((category) => (
                      <motion.button
                        key={category}
                        onClick={() =>
                          setSelectedCategory(category === 'All' ? null : category)
                        }
                        className={`px-6 py-3 rounded-full font-medium transition-all ${
                          (category === 'All' && !selectedCategory) ||
                          selectedCategory === category
                            ? 'bg-foreground text-background'
                            : 'bg-secondary text-foreground hover:bg-foreground/20'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {category}
                      </motion.button>
                    ))}
                  </motion.div>
                </motion.div>

                {/* Featured Project Highlight (First of filtered) */}
                {filteredProjects.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.8 }}
                    className="mb-24 group"
                  >
                    <a
                      href={filteredProjects[0].url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                        {/* Image */}
                        <div className="relative h-96 md:h-full rounded-2xl overflow-hidden">
                          <motion.img
                            src={filteredProjects[0].image}
                            alt={filteredProjects[0].name}
                            className="w-full h-full object-cover"
                            initial={{ filter: 'blur(20px)', opacity: 0 }}
                            whileInView={{ filter: 'blur(0px)', opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.2 }}
                            whileHover={{ scale: 1.08 }}
                          />
                          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />
                          <motion.div
                            className="absolute top-4 right-4 px-4 py-2 bg-background/80 backdrop-blur rounded-full text-sm font-medium"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                          >
                            ⭐ Latest
                          </motion.div>
                        </div>

                        {/* Content */}
                        <div className="flex flex-col justify-center">
                          <span className="text-sm font-mono text-foreground/60 mb-3">
                            Featured Project
                          </span>
                          <h3 className="font-serif-display text-5xl md:text-6xl font-bold mb-4 group-hover:text-foreground/80 transition-colors">
                            {filteredProjects[0].name}
                          </h3>
                          <p className="text-xl text-muted-foreground mb-8">
                            {filteredProjects[0].description}
                          </p>
                          <div className="flex items-center gap-3 text-sm text-foreground/60 mb-8">
                            <span>{filteredProjects[0].tech}</span>
                            <span className="px-3 py-1 bg-secondary rounded-full text-xs">
                              {filteredProjects[0].category}
                            </span>
                          </div>
                          <motion.div
                            className="flex items-center gap-2 text-foreground group-hover:gap-3 transition-all"
                            whileHover={{ x: 4 }}
                          >
                            View Project
                            <ArrowUpRight size={20} />
                          </motion.div>
                        </div>
                      </div>
                    </a>
                  </motion.div>
                )}

                {/* All Projects Grid */}
                {filteredProjects.length > 1 && (
                  <>
                    <motion.h3
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      className="font-serif-display text-3xl font-bold mb-12 mt-24"
                    >
                      More Work
                    </motion.h3>
                    <div className="space-y-24">
                      {filteredProjects.slice(1).map((project, index) => (
                        <motion.a
                          key={project.name}
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          initial={{ opacity: 0, y: 40 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: '-100px' }}
                          transition={{ duration: 0.8, delay: index * 0.1 }}
                          className="group block"
                        >
                          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                            {/* Image - alternates position */}
                            <div
                              className={`relative h-96 md:h-full rounded-2xl overflow-hidden ${
                                index % 2 === 1 ? 'md:order-2' : ''
                              }`}
                            >
                              <motion.img
                                src={project.image}
                                alt={project.name}
                                className="w-full h-full object-cover"
                                initial={{ filter: 'blur(20px)', opacity: 0 }}
                                whileInView={{ filter: 'blur(0px)', opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: 0.1 }}
                                whileHover={{ scale: 1.05 }}
                              />
                              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />
                            </div>

                            {/* Content */}
                            <div
                              className={`flex flex-col justify-center ${
                                index % 2 === 1 ? 'md:order-1' : ''
                              }`}
                            >
                              <span className="text-sm font-mono text-foreground/60 mb-3">
                                0{filteredProjects.indexOf(project) + 1}
                              </span>
                              <h3 className="font-serif-display text-4xl md:text-5xl font-bold mb-4 group-hover:text-foreground/80 transition-colors">
                                {project.name}
                              </h3>
                              <p className="text-lg text-muted-foreground mb-8">
                                {project.description}
                              </p>
                              <div className="flex items-center gap-3 text-sm text-foreground/60">
                                <span>{project.tech}</span>
                                <span className="px-3 py-1 bg-secondary rounded-full text-xs">
                                  {project.category}
                                </span>
                                <ArrowUpRight
                                  size={18}
                                  className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                                />
                              </div>
                            </div>
                          </div>
                        </motion.a>
                      ))}
                    </div>
                  </>
                )}

                {/* No results message */}
                {filteredProjects.length === 0 && (
                  <motion.div
                    className="text-center py-20"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                  >
                    <p className="text-muted-foreground text-lg">
                      No projects in this category yet. Try another!
                    </p>
                  </motion.div>
                )}
              </div>
            </section>

            {/* About Section - Integrated Story & Philosophy */}
            <section className="relative py-32 px-6 md:px-12 bg-background border-t border-border/50">
              <div className="max-w-5xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8 }}
                >
                  <h2 className="font-serif-display text-6xl md:text-7xl font-bold mb-12">About The Journey</h2>

                  <div className="space-y-8 text-lg text-muted-foreground leading-relaxed">
                    <p>
                      I'm <span className="text-foreground font-medium">Maanas</span>, a developer and creator from Bangalore who fell in love
                      with programming through building games and tools. There's something magical about turning ideas
                      into working software that people actually use.
                    </p>

                    <p>
                      My work spans systems programming with C++, building web experiences with React, and solving
                      algorithmic puzzles on LeetCode. But honestly? I'm just having fun with it. That's the core of
                      everything I build—genuine excitement and curiosity.
                    </p>

                    <p>
                      Beyond code, I'm passionate about music (hip-hop and rock), Formula 1 (Tifosi forever! 🔴), motorcycles,
                      and badminton. I love understanding how things work—both machines and ideas. Every project is a
                      chance to learn something new.
                    </p>

                    <p>
                      I believe in building things that are both functional and beautiful. Whether it's a complex system
                      or a simple interaction, the craft matters. Let's create something cool together.
                    </p>
                  </div>

                  {/* Tech Stack Preview */}
                  <div className="mt-16 pt-16 border-t border-border/50">
                    <h3 className="font-serif-display text-2xl font-bold mb-8">What I Use</h3>
                    <div className="grid md:grid-cols-2 gap-12">
                      <div>
                        <h4 className="text-sm font-mono text-foreground/60 mb-4 uppercase">Languages & Frameworks</h4>
                        <div className="space-y-2 text-muted-foreground">
                          <p>C++ • JavaScript • TypeScript • Python</p>
                          <p>React • Node.js • Express • Vite</p>
                          <p>MySQL • MongoDB • Docker</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-mono text-foreground/60 mb-4 uppercase">Tools & Setup</h4>
                        <div className="space-y-2 text-muted-foreground">
                          <p>MacBook Air M4</p>
                          <p>VS Code • Cursor • AntiGravity</p>
                          <p>Git • GitHub • Postman</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Contact Section */}
            <section className="relative py-32 px-6 md:px-12 bg-background border-t border-border/50">
              <div className="max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8 }}
                >
                  <h2 className="font-serif-display text-6xl md:text-7xl font-bold mb-12">Let's Connect</h2>

                  <div className="grid md:grid-cols-2 gap-16">
                    {/* Contact Info */}
                    <div>
                      <p className="text-lg text-muted-foreground mb-12">
                        Got an idea? Want to collaborate? Just want to chat? Reach out!
                      </p>
                      <div className="space-y-6">
                        <motion.button
                          onClick={() => copyToClipboard('maanasnk@yahoo.com')}
                          whileHover={{ x: 4 }}
                          className="block text-lg text-foreground hover:text-foreground/70 transition-colors group w-full text-left"
                        >
                          <span className="flex items-center gap-2">
                            maanasnk@yahoo.com
                            <motion.div
                              animate={{ opacity: copiedEmail === 'maanasnk@yahoo.com' ? 1 : 0, scale: copiedEmail === 'maanasnk@yahoo.com' ? 1 : 0.8 }}
                              transition={{ duration: 0.2 }}
                            >
                              {copiedEmail === 'maanasnk@yahoo.com' ? (
                                <Check size={18} className="text-green-500" />
                              ) : (
                                <Copy size={18} className="text-foreground/40 group-hover:text-foreground/60 transition-colors" />
                              )}
                            </motion.div>
                          </span>
                        </motion.button>
                        <motion.button
                          onClick={() => copyToClipboard('maanasnk@gmail.com')}
                          whileHover={{ x: 4 }}
                          className="block text-lg text-foreground hover:text-foreground/70 transition-colors group w-full text-left"
                        >
                          <span className="flex items-center gap-2">
                            maanasnk@gmail.com
                            <motion.div
                              animate={{ opacity: copiedEmail === 'maanasnk@gmail.com' ? 1 : 0, scale: copiedEmail === 'maanasnk@gmail.com' ? 1 : 0.8 }}
                              transition={{ duration: 0.2 }}
                            >
                              {copiedEmail === 'maanasnk@gmail.com' ? (
                                <Check size={18} className="text-green-500" />
                              ) : (
                                <Copy size={18} className="text-foreground/40 group-hover:text-foreground/60 transition-colors" />
                              )}
                            </motion.div>
                          </span>
                        </motion.button>
                      </div>

                      {/* Social Links */}
                      <div className="mt-12 pt-12 border-t border-border/30 flex items-center gap-6">
                        <motion.a
                          href="https://github.com/xplictly"
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1, y: -4 }}
                          className="text-foreground/60 hover:text-foreground transition-colors"
                        >
                          <Github size={24} />
                        </motion.a>
                        <motion.a
                          href="https://instagram.com/maanasxd"
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1, y: -4 }}
                          className="text-foreground/60 hover:text-foreground transition-colors"
                        >
                          <Instagram size={24} />
                        </motion.a>
                        <motion.button
                          onClick={() => copyToClipboard('maanasnk@yahoo.com')}
                          whileHover={{ scale: 1.1, y: -4 }}
                          className="text-foreground/60 hover:text-foreground transition-colors"
                        >
                          <Mail size={24} />
                        </motion.button>
                      </div>
                    </div>

                    {/* Contact Form */}
                    <ContactForm />
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Footer */}
            <footer className="py-16 px-6 md:px-12 border-t border-border/30 bg-background">
              <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                  <div>
                    <p className="text-foreground/60 text-sm">© 2026 Maanas. All rights reserved.</p>
                  </div>
                  <div className="flex items-center gap-6 text-sm text-foreground/60">
                    <motion.button
                      onClick={() => setEasterEggActive(true)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="cursor-pointer select-none hover:text-foreground transition-colors"
                    >
                      GS4L
                    </motion.button>
                    <span className="text-foreground/40">•</span>
                    <span className="font-serif-display italic">xplicit</span>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </>
      )}
    </div>
  );
};

export default Index;
