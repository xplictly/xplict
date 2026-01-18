# xplict - Maanas Portfolio

A personal portfolio website showcasing my work, skills, and journey as a developer. Built with React, TypeScript, and Tailwind CSS with beautiful animations powered by Framer Motion.

![Portfolio Preview](./src/assets/project-path-visualizer.jpg)

## ✨ Features

- **Animated Intro Screen** - Japanese aesthetic with "一期一会" (Ichigo Ichie - One time, one meeting)
- **Smooth Animations** - Powered by Framer Motion throughout the site
- **Project Showcase** - Filterable project gallery with category selection
- **Interactive Elements** - Custom cursor, spotlight effects, scroll progress bar
- **Easter Eggs** - Konami code activation, hidden GS4L reference
- **Animated Counters** - Statistics that animate on scroll
- **Responsive Design** - Optimized for all screen sizes
- **Theme Support** - Light/dark mode via next-themes

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or bun package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/xplictly/xplict.git
cd xplict

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
xplict/
├── public/                 # Static assets
├── src/
│   ├── assets/            # Images and media
│   │   ├── maanas-avatar.jpg
│   │   └── project-*.jpg  # Project screenshots
│   ├── components/        # React components
│   │   ├── ContactForm.tsx
│   │   ├── CustomCursor.tsx
│   │   ├── EasterEggOverlay.tsx
│   │   ├── FloatingNav.tsx
│   │   ├── GitHubStats.tsx
│   │   ├── LearningPath.tsx
│   │   ├── SkillsRadar.tsx
│   │   ├── SpotlightCursor.tsx
│   │   ├── TechStack.tsx
│   │   ├── ThemeToggle.tsx
│   │   ├── UsesStack.tsx
│   │   └── ui/            # Shadcn/ui components
│   ├── context/           # React contexts
│   ├── hooks/             # Custom hooks
│   │   └── useKonamiCode.ts
│   ├── pages/             # Page components
│   │   └── Index.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── vite.config.ts
```

## 🛠 Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS + Shadcn/ui
- **Animations**: Framer Motion 12
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod
- **UI Components**: Radix UI primitives
- **Theme**: next-themes
- **Charts**: Recharts

## 📦 Dependencies

### Core
- `react`, `react-dom` - UI framework
- `@radix-ui/*` - Accessible UI primitives
- `framer-motion` - Animation library
- `lucide-react` - Icon library
- `tailwindcss-animate` - Tailwind animations

### Utilities
- `clsx`, `tailwind-merge` - Class utilities
- `class-variance-authority` - Variant props
- `zod` - Schema validation

### Additional
- `react-hook-form` - Form handling
- `@tanstack/react-query` - Data fetching
- `sonner` - Toast notifications
- `embla-carousel-react` - Carousel component

## 🎨 Design Philosophy

> "I'm just having fun!!!!!"

This portfolio reflects my philosophy - building things that are both functional and beautiful. Every interaction is crafted with care, from the smooth scroll animations to the playful Easter eggs.

### Key Design Elements

1. **Typography**: Mix of serif display fonts and clean sans-serif for readability
2. **Color Scheme**: Minimalist with high contrast for accessibility
3. **Micro-interactions**: Subtle hover states and transitions
4. **Japanese Aesthetics**: The "一期一会" theme represents appreciating each moment

## 🎮 Easter Eggs

1. **Konami Code**: ↑↑↓↓←→←→BA on keyboard activates a special overlay
2. **GS4L Button**: Click "GS4L" in the footer for a surprise
3. **Intro Animation**: Watch for the Japanese text animation on load

## 📱 Sections

- **Hero** - Introduction with animated stats
- **Work** - Featured projects with category filtering
- **About** - Personal journey and philosophy
- **Connect** - Contact form and social links

## 🔧 Configuration

### Environment Variables

Create a `.env` file for local development:

```env
VITE_GITHUB_TOKEN=your_github_token
```

### Shadcn/ui Components

Add new components with:

```bash
npx shadcn@latest add component-name
```

## 📝 Scripts

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run build:dev # Build in development mode
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

## 🤝 Contributing

This is a personal portfolio, but suggestions are welcome! Feel free to open issues or PRs.

## 📄 License

MIT License - feel free to use this as inspiration for your own portfolio.

---

Built with ❤️ by Maanas

**一期一会** - One time, one meeting

