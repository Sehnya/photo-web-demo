# Project Structure

## Root Level
```
photo-web-demo/
├── src/                    # Source code
├── public/                 # Static assets
├── .kiro/                  # Kiro configuration and steering
├── node_modules/           # Dependencies
├── index.html              # HTML entry point
├── package.json            # Project configuration
├── vite.config.ts          # Vite build configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
├── tsconfig.json           # TypeScript configuration
└── bun.lock               # Dependency lock file
```

## Source Structure (`/src/`)
```
src/
├── App.tsx                 # Main application component with routing
├── main.tsx               # Application entry point
├── index.css              # Global styles and Tailwind imports
├── components/            # Reusable UI components
│   ├── CardNav.tsx        # Navigation component
│   ├── ScrollVelocity.tsx # Animated text scrolling
│   ├── TargetCursor.tsx   # Custom cursor component
│   └── TiltedCard.tsx     # Interactive photo card component
├── pages/                 # Route-based page components
│   ├── About.tsx          # About page
│   ├── Book.tsx           # Package booking page
│   ├── Checkout.tsx       # Cart checkout page
│   ├── Contact.tsx        # Contact information page
│   ├── Login.tsx          # User login page
│   ├── Portfolio.tsx      # Photo gallery page
│   ├── Schedule.tsx       # Appointment scheduling page
│   └── Signup.tsx         # User registration page
└── services/              # Business logic and data management
    ├── payments.ts        # Payment processing utilities
    └── userStore.ts       # User authentication and data persistence
```

## Architecture Patterns

### Routing
- Hash-based routing (`#/route`) implemented in `App.tsx`
- Route state managed with `useState` and `hashchange` event listener
- Page transitions handled with Framer Motion's `AnimatePresence`

### Component Organization
- **Components**: Reusable UI elements with props interfaces
- **Pages**: Route-specific components that compose multiple components
- **Services**: Data layer abstraction for business logic

### State Management
- Local component state with `useState`
- Cart state lifted to `App.tsx` and passed down
- User authentication state managed in `userStore.ts`
- Persistent data stored in `localStorage`

### Styling Conventions
- Tailwind utility classes for styling
- Responsive design with `md:` breakpoints
- Custom animations using Motion components
- Component-specific styling kept inline with Tailwind classes

### File Naming
- PascalCase for React components (`.tsx` files)
- camelCase for utility files (`.ts` files)
- Descriptive names that indicate component purpose