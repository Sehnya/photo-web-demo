# **Branden Adams Photography**

A comprehensive photography portfolio and booking website featuring an interactive gallery, complete e-commerce system, and professional booking management.

## 🎯 Overview

This is a full-featured photography business website that serves as both a portfolio showcase and a complete booking platform. Built with modern web technologies, it provides a seamless experience for clients to view work, book sessions, and manage their photography needs.

## ✨ Key Features

### 🎨 **Interactive Portfolio**

- Animated photo gallery with custom tilt effects
- Responsive design optimized for all devices
- Professional image showcase with hover animations
- Mobile-first approach with desktop enhancements

### 🛒 **E-Commerce System**

- Shopping cart with real-time calculations
- State-based tax calculations
- Multiple payment options (full payment or 50% deposit)
- Secure checkout flow with Stripe integration ready

### 📅 **Booking Management**

- Interactive session scheduling
- Multiple photography package options
- Client information collection
- Booking confirmation system with email notifications

### 💼 **Professional Features**

- Comprehensive booking confirmation pages
- Email template system for client communications
- Professional terms and conditions
- Code of conduct and expectations documentation

### 🚀 **Demo Mode**

- Built-in demo functionality for testing
- Sample data population for development
- Complete checkout flow simulation
- Easy demonstration for potential clients

## 🛠️ Technology Stack

- ⚡ **Bun** - Fast JavaScript runtime and package manager
- ⚛️ **React 18** - Latest React with concurrent features and hooks
- 🏗️ **Vite** - Lightning fast build tool with HMR
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 📦 **TypeScript** - Type safety and enhanced developer experience
- 🎭 **Framer Motion** - Advanced animations and page transitions
- 🎪 **GSAP** - Professional animation library for scroll effects
- 🎯 **React Icons** - Comprehensive icon library

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh) - JavaScript runtime and package manager
- Node.js 18+ (for compatibility)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd photo-web-demo
   ```

2. **Install dependencies**

   ```bash
   bun install
   ```

3. **Start development server**

   ```bash
   bun run dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:5173](http://localhost:5173)

### Build Commands

```bash
# Development server with hot reload
bun run dev

# Production build
bun run build

# Preview production build
bun run preview
```

## 🎮 Demo Mode

The application includes comprehensive demo functionality for testing and demonstrations:

### 📦 **Package Booking Demo**

1. Navigate to the **Book** page
2. Click "🚀 Add Demo Items (For Testing)" to populate cart
3. Proceed to checkout to test the complete flow

### 💳 **Checkout Demo**

1. Add items to cart (use demo button or manually)
2. Go to **Checkout** page
3. Click "🚀 Demo Payment (For Testing)" to simulate successful payment
4. Experience the complete booking confirmation flow

### 📅 **Scheduling Demo**

1. Navigate to **Schedule** page
2. Click "🎯 Fill Demo Data (For Testing)" to auto-populate forms
3. Complete booking to see confirmation system

## 📱 User Experience Flow

### 1. **Discovery Phase**

- **Landing Page**: Interactive photo cards with animations
- **Portfolio**: Professional gallery showcase
- **About**: Photographer information and process

### 2. **Booking Phase**

- **Package Selection**: Choose from 5 professional packages
- **Cart Management**: Add/remove items with real-time calculations
- **Checkout**: Secure payment processing with tax calculations

### 3. **Confirmation Phase**

- **Booking Confirmation**: Comprehensive order details
- **Email Notifications**: Professional confirmation emails
- **Session Scheduling**: Interactive calendar booking

### 4. **Preparation Phase**

- **Guidelines**: Detailed preparation instructions
- **Expectations**: Professional standards and code of conduct
- **Communication**: Direct contact information and support

## 📁 Project Structure

```
photo-web-demo/
├── src/
│   ├── App.tsx                 # Main application with routing
│   ├── main.tsx               # Application entry point
│   ├── index.css              # Global styles and Tailwind imports
│   ├── components/            # Reusable UI components
│   │   ├── CardNav.tsx        # Navigation component
│   │   ├── ScrollVelocity.tsx # Animated text scrolling
│   │   ├── TargetCursor.tsx   # Custom cursor component
│   │   └── TiltedCard.tsx     # Interactive photo card component
│   ├── pages/                 # Route-based page components
│   │   ├── About.tsx          # About page
│   │   ├── Book.tsx           # Package booking page
│   │   ├── BookingConfirmation.tsx # Booking confirmation system
│   │   ├── Checkout.tsx       # Cart checkout page
│   │   ├── Contact.tsx        # Contact information page
│   │   ├── Login.tsx          # User login page
│   │   ├── Portfolio.tsx      # Photo gallery page
│   │   ├── Schedule.tsx       # Appointment scheduling page
│   │   └── Signup.tsx         # User registration page
│   ├── services/              # Business logic and data management
│   │   ├── emailService.ts    # Email template and sending utilities
│   │   ├── payments.ts        # Payment processing utilities
│   │   └── userStore.ts       # User authentication and data persistence
│   └── templates/             # Email templates
│       └── BookingConfirmationEmail.html # Professional email template
├── public/                    # Static assets
│   ├── photo-1.png           # Portfolio images
│   ├── photo-2.png
│   └── ...
├── .kiro/                     # Kiro configuration and steering
├── index.html                 # HTML entry point
├── vite.config.ts            # Vite build configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── postcss.config.js         # PostCSS configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Project dependencies and scripts
```

## 🎨 Design System

### **Color Palette**

- **Primary**: Black (#000000) - Professional, elegant
- **Accent Colors**: Dynamic based on image content
- **Interactive**: White on black for high contrast
- **Status**: Green for success, Blue for information, Red for warnings

### **Typography**

- **Headings**: Bold, uppercase for impact
- **Body**: Clean, readable sans-serif
- **Monospace**: For technical information (order IDs, etc.)

### **Animations**

- **Page Transitions**: Smooth fade and slide effects
- **Interactive Elements**: Hover states with scale and color changes
- **Loading States**: Professional loading indicators
- **Scroll Effects**: Parallax and velocity-based animations

## 💰 Package Options

| Package                    | Duration | Price  | Features                        |
| -------------------------- | -------- | ------ | ------------------------------- |
| **Professional Headshots** | 1 hour   | $850   | LinkedIn, corporate, 25+ images |
| **Classic Portraits**      | 2 hours  | $1,200 | Timeless portraits, 40+ images  |
| **Creative Portraits**     | 3 hours  | $1,500 | Artistic concepts, 50+ images   |
| **Location Sessions**      | 3 hours  | $1,800 | On-location, 60+ images         |
| **Personal Branding**      | 4 hours  | $2,500 | Complete branding, 100+ images  |

## 🔧 Configuration

### **Payment Integration**

Update `src/services/payments.ts` with your Stripe Payment Links:

```typescript
export const productPaymentLinks: Record<ProductId, string | null> = {
  headshots: "https://buy.stripe.com/your-headshots-link",
  classic: "https://buy.stripe.com/your-classic-link",
  // ... other packages
};
```

### **Email Service**

Configure email templates in `src/templates/` and update service settings in `src/services/emailService.ts`.

### **Tax Rates**

Update tax rates by state in `src/pages/Checkout.tsx`:

```typescript
const taxRates: Record<string, number> = {
  CA: 0.0825, // California
  NY: 0.088, // New York
  // ... other states
};
```

## 🚀 Deployment

### **Production Build**

```bash
bun run build
```

### **Environment Variables**

Create `.env` file for production settings:

```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...
VITE_EMAIL_SERVICE_URL=https://your-email-service.com
VITE_CONTACT_EMAIL=hello@brandenadams.com
```

### **Hosting Recommendations**

- **Vercel**: Optimal for React/Vite applications
- **Netlify**: Great for static site deployment
- **AWS S3 + CloudFront**: Enterprise-level hosting

## 🔒 Security Features

- **SSL Encryption**: All data transmission secured
- **PCI Compliance**: Stripe integration for payment security
- **Input Validation**: Client and server-side validation
- **CSRF Protection**: Built-in security measures
- **Data Privacy**: GDPR-compliant data handling

## 📧 Email System

The application includes a comprehensive email system:

- **Booking Confirmations**: Automated confirmation emails
- **Professional Templates**: HTML email templates with inline CSS
- **Preview Functionality**: Test emails before sending
- **Responsive Design**: Mobile-optimized email layouts

## 🎯 Performance Optimizations

- **Code Splitting**: Automatic route-based code splitting
- **Image Optimization**: Optimized image loading and caching
- **Bundle Analysis**: Optimized bundle sizes
- **Lazy Loading**: Components loaded on demand
- **Caching Strategy**: Efficient browser caching

## 🛠️ Development Tools

- **TypeScript**: Full type safety
- **ESLint**: Code quality enforcement
- **Prettier**: Code formatting
- **Hot Reload**: Instant development feedback
- **Source Maps**: Enhanced debugging

## 📱 Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile Browsers**: iOS Safari, Chrome Mobile
- **Progressive Enhancement**: Graceful degradation for older browsers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For questions or support:

- **Email**: hello@brandenadams.com
- **Phone**: (123) 456-7890
- **Website**: [brandenadams.com](https://brandenadams.com)

## 🙏 Acknowledgments

- **Design Inspiration**: Modern photography portfolio trends
- **Animation Libraries**: Framer Motion and GSAP communities
- **UI Components**: Tailwind CSS ecosystem
- **Development Tools**: Bun and Vite teams

---

**Built with ❤️ for professional photographers**
