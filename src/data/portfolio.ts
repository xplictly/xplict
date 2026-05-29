import badgeTypescript from '@/assets/badges/typescript.svg';
import badgeReact from '@/assets/badges/react.svg';
import badgeSwift from '@/assets/badges/swift.svg';
import badgePython from '@/assets/badges/python.svg';
import badgeNode from '@/assets/badges/node.svg';
import badgeKotlin from '@/assets/badges/kotlin.svg';

export const BADGES: Record<string, string> = {
  typescript: badgeTypescript,
  react: badgeReact,
  swift: badgeSwift,
  python: badgePython,
  node: badgeNode,
  kotlin: badgeKotlin,
};

export const projects = [
  {
    id: 'plantpal',
    name: 'PlantPal',
    description: 'A comprehensive plant management application to track watering schedules, maintain a plant journal, and discover new plants.',
    url: 'https://github.com/xplictly/plantpal',
    tech: 'Kotlin · Android · Jetpack Compose',
    badges: ['kotlin'],
    category: 'Mobile',
    featured: true,
    contribution: 'Your all-in-one companion for plant care, tracking, and discovery.',
    approach: 'I architected PlantPal using modern Android development practices, leveraging Jetpack Compose for a reactive UI and Kotlin Coroutines for asynchronous data handling. To manage plant data effectively, I utilized Room Database for local persistence, ensuring offline capabilities. The core challenge was designing a robust scheduling system for watering reminders, which I solved by integrating WorkManager to handle background tasks reliably even when the app is closed.'
  },
  {
    id: 'widget-wall',
    name: 'Widget Wall',
    description: 'A collection of tiny macOS widgets built with WidgetKit—focused, glanceable information for the desktop.',
    url: 'https://github.com/xplictly/widget-wall',
    tech: 'Swift · WidgetKit',
    badges: ['swift'],
    category: 'Mobile',
    featured: true,
    contribution: 'Modular widgets that surface quick, at-a-glance information to reduce context switching.',
    approach: 'Widget Wall was born from a desire to make macOS more informative at a glance. I built the foundation using Swift and WidgetKit, focusing on optimizing memory usage and update frequency to ensure system performance wasn\'t impacted. I implemented an App Group shared container to allow seamless data syncing between the main app (for configuration) and the widget extensions. Designing the modular timeline provider was key to delivering accurate, up-to-date content without draining battery life.'
  },
  {
    id: 'path-visualizer',
    name: 'Path Visualizer',
    description: 'Interactive visualizer for pathfinding algorithms (A*, Dijkstra, BFS). Great for teaching and debugging algorithmic ideas.',
    url: 'https://github.com/xplictly/path-visualizer',
    tech: 'TypeScript · React',
    badges: ['typescript', 'react'],
    category: 'Web',
    featured: true,
    contribution: 'Educational tool that helps learners and engineers prototype and reason about graph search algorithms quickly.',
    approach: 'I wanted to create an intuitive way to understand complex graph algorithms. I chose React and TypeScript to build a highly interactive grid system. State management was crucial here, as maintaining grid state during algorithm execution required careful optimization to prevent unnecessary re-renders. I implemented a custom hook to manage the animation loop, using `requestAnimationFrame` to ensure smooth rendering of the search process while allowing users to adjust execution speed dynamically.'
  },
  {
    id: 'image-reko',
    name: 'Image Reko (iOS/macOS)',
    description: 'On-device image recognition demos using CoreML & Vision for privacy-friendly inference on Apple platforms.',
    url: 'https://github.com/xplictly/image-reko-ios-macos',
    tech: 'Swift · CoreML',
    badges: ['swift'],
    category: 'Mobile',
    contribution: 'Prototype showcasing fast, private ML inference — useful for apps needing local image understanding without server costs.',
    approach: 'Privacy-first ML is a growing necessity. For Image Reko, I focused entirely on on-device processing using Apple\'s Vision framework and CoreML. The main challenge was handling live camera feeds efficiently. I implemented a custom `AVCaptureVideoDataOutputSampleBufferDelegate` to process frames concurrently, resizing and cropping them before passing them to the CoreML model to maintain 60FPS while minimizing thermal throttling.'
  },
  {
    id: 'f1-companion',
    name: 'F1 Companion',
    description: 'Mobile companion app for F1 fans providing session summaries and lightweight tracking features.',
    url: 'https://github.com/xplictly/f1companion',
    tech: 'Kotlin · Android',
    badges: ['kotlin'],
    category: 'Mobile',
    contribution: 'Aggregates and presents racing data to make session info more accessible for fans.',
    approach: 'As a huge Formula 1 fan, I built F1 Companion to have racing data easily accessible. I integrated with the Ergast Developer API to fetch historical and live timing data. To handle network latency and API rate limits, I implemented a robust caching layer using Retrofit and Room. The UI was built following Material Design 3 guidelines to provide a modern, cohesive experience.'
  },
  {
    id: 'cursed-snake',
    name: 'Cursed Snake',
    description: 'Terminal-based snake variant implemented for learning game loops, input handling, and procedural content.',
    url: 'https://github.com/xplictly/cursed-snake',
    tech: 'Python',
    badges: ['python'],
    category: 'Games',
    contribution: 'A compact sandbox for learning game development fundamentals and quick prototyping.',
    approach: 'Cursed Snake was an exercise in understanding low-level game loops. Using Python\'s `curses` library, I built a non-blocking input listener and a fixed time-step update loop. The specific approach to the game logic involved representing the snake as a deque for $O(1)$ head/tail operations, and implementing basic procedural generation for obstacles to increase difficulty dynamically.'
  },
  {
    id: 'discord-uwu',
    name: 'Discord-UwU',
    description: 'A small Discord bot featuring moderation helpers and playful commands for community servers.',
    url: 'https://github.com/xplictly/Discord-UwU',
    tech: 'Node.js · Discord.js',
    badges: ['node'],
    category: 'Tools',
    contribution: 'Streamlines moderation and adds light-hearted features to keep communities engaged.',
    approach: 'Built entirely with Node.js and Discord.js, I structured the bot using a modular command handler pattern, making it extremely easy to add new features. I integrated a SQLite database for persistent server configurations and user data. The key focus was on event-driven architecture, ensuring the bot responded quickly to messages and reactions without blocking the Node event loop.'
  },
];

export const experiences = [
  {
    id: 1,
    role: "Software Developer",
    company: "Freelance",
    period: "2022 - Present",
    description: "Building custom web and mobile applications for clients. Focused on performant React frontends and native mobile experiences.",
  },
  {
    id: 2,
    role: "Open Source Contributor",
    company: "Various Projects",
    period: "2022 - Present",
    description: "Actively contributing to open-source repositories, focusing on tooling, utility libraries, and developer experience improvements.",
  },
  {
    id: 3,
    role: "Student Developer",
    company: "University",
    period: "2024 - Present",
    description: "Currently working on projects assigned by the professors and working projects on my own. Haven't been able to work for clubs as of now",
  }
];

export const skillsData = [
  { name: 'C++', proficiency: 85, fill: 'hsl(var(--foreground))' },
  { name: 'React', proficiency: 90, fill: 'hsl(var(--foreground))' },
  { name: 'TypeScript', proficiency: 85, fill: 'hsl(var(--foreground))' },
  { name: 'Python', proficiency: 75, fill: 'hsl(var(--foreground))' },
  { name: 'Kotlin', proficiency: 80, fill: 'hsl(var(--foreground))' },
  { name: 'Swift', proficiency: 70, fill: 'hsl(var(--foreground))' },
];

export const nowData = {
  status: "Building and Learning",
  learning: "Currently deep-diving into Rust and WebAssembly to understand systems programming on the web.",
  building: "Currently not working on anything because of College's routine (classic)",
  listening: "A heavy rotation of classic Thrash and modern Progressive Metal (Gojira, Tool, Metallica).",
  reading: "Tuesdays with Morrie by Mitch Albom"
};
