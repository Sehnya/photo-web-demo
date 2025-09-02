# Technology Stack

## Build System & Runtime
- **Bun**: JavaScript runtime and package manager (preferred over npm/yarn)
- **Vite**: Build tool and dev server with HMR
- **TypeScript**: Strict type checking enabled with modern ES2020 target

## Frontend Framework
- **React 18**: Latest version with concurrent features
- **React DOM**: Client-side rendering

## Styling & UI
- **Tailwind CSS**: Utility-first CSS framework
- **PostCSS**: CSS processing with autoprefixer
- **tailwindcss-animated**: Additional animation utilities

## Animation Libraries
- **Motion (Framer Motion)**: Primary animation library for page transitions and interactions
- **GSAP**: Advanced animations, particularly for scroll-based effects
- Custom spring animations with specific damping/stiffness values

## Icons & Assets
- **React Icons**: Icon library
- **Public folder**: Static assets (images stored in `/public/`)

## State Management
- **React useState/useEffect**: Local component state
- **localStorage**: Client-side persistence for cart and user sessions
- Custom services in `/src/services/` for data management

## Development Commands

```bash
# Development server
bun run dev

# Production build
bun run build

# Preview production build
bun run preview
```

## Code Style Guidelines
- Use TypeScript strict mode
- Prefer function components with hooks
- Use motion/react for animations over CSS transitions
- Implement responsive design with Tailwind's mobile-first approach
- Store reusable logic in custom hooks or service files