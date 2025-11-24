# 🚀 Modern Portfolio Website

A stunning, fully responsive portfolio website built with React, TypeScript, and modern web technologies. Features smooth animations, dark mode support, and a beautiful glassmorphism design.

![Portfolio Preview](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## Features

### 🎨 Design & UI
- **Glassmorphism Design**: Modern glass-effect UI with backdrop blur
- **Dark/Light Mode**: Seamless theme switching with system preference detection
- **Smooth Animations**: Powered by Framer Motion for fluid transitions
- **Responsive Layout**: Mobile-first design that works on all devices
- **Interactive Elements**: Hover effects, micro-animations, and scroll-based animations

### Sections
- **Hero Section**: Dynamic introduction with GitHub profile integration
- **About Me**: Personal bio with leadership and service highlights
- **Tech Stack**: Infinite scrolling marquee with technology icons (pause on hover)
- **Experience**: Horizontal timeline with alternating card layouts
- **Projects**: GitHub repository showcase with pagination
- **Certificates**: Display of professional certifications
- **Contact Form**: Integrated with Web3Forms for email submissions

### Technical Features
- **Type-Safe**: Built with TypeScript for robust code
- **SEO Optimized**: React Helmet for meta tags and SEO
- **Form Validation**: React Hook Form for efficient form handling
- **Icon Library**: Lucide React + React Icons for comprehensive icon coverage
- **Scroll Spy**: Active navbar highlighting based on scroll position
- **GitHub API Integration**: Real-time profile data fetching
- **Visitor Counter**: Track portfolio visits

## Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AnurupMondal/portfolio-v3.git
   cd portfolio-v3
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure your data**
   
   Edit `src/data/portfolioData.json` with your personal information:
   ```json
   {
     "personalInfo": {
       "name": "Your Name",
       "role": "Your Role",
       "email": "your.email@example.com",
       "github": "https://github.com/yourusername",
       "linkedin": "https://linkedin.com/in/yourusername"
     }
   }
   ```

4. **Set up Web3Forms (for contact form)**
   
   - Get your free API key from [Web3Forms](https://web3forms.com)
   - Update the access key in `src/components/Contact.tsx`:
     ```typescript
     formData.append("access_key", "YOUR_ACCESS_KEY_HERE");
     ```

5. **Configure GitHub integration**
   
   Update `src/config/github.ts`:
   ```typescript
   export const GITHUB_USERNAME = 'yourusername';
   ```

### Development

Start the development server:
```bash
npm run dev
```

The site will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## 📁 Project Structure

```
portfolio-v3/
├── src/
│   ├── components/          # React components
│   │   ├── common/         # Reusable components
│   │   ├── Hero.tsx        # Hero section
│   │   ├── Skills.tsx      # Tech stack marquee
│   │   ├── Experience.tsx  # Timeline component
│   │   ├── Projects.tsx    # GitHub projects
│   │   ├── Contact.tsx     # Contact form
│   │   └── ...
│   ├── pages/              # Page components
│   ├── layout/             # Layout components
│   ├── hooks/              # Custom React hooks
│   ├── utils/              # Utility functions
│   ├── context/            # React context providers
│   ├── data/               # JSON data files
│   ├── config/             # Configuration files
│   └── index.css           # Global styles
├── public/                 # Static assets
└── package.json
```

## Customization

### Colors & Theme

Edit `src/index.css` to customize the color scheme:

```css
:root {
  --primary: 58 126 255;      /* Blue */
  --secondary: 147 51 234;    /* Purple */
  --background: 248 249 251;  /* Light gray */
  /* ... */
}

.dark {
  --primary: 96 165 250;
  --background: 12 12 13;
  /* ... */
}
```

### Adding New Sections

1. Create a new component in `src/components/`
2. Import and add it to `src/pages/Home.tsx`
3. Update the navbar links in `src/components/Navbar.tsx`

## Tech Stack

### Core
- **React 19.2** - UI library
- **TypeScript 5.9** - Type safety
- **Vite 7.2** - Build tool
- **React Router 7.9** - Routing

### Styling
- **Tailwind CSS 3.4** - Utility-first CSS
- **Framer Motion 12.23** - Animation library

### Forms & Validation
- **React Hook Form 7.66** - Form handling
- **Web3Forms** - Contact form backend

### Icons & UI
- **Lucide React 0.554** - Icon library
- **React Icons 5.5** - Additional icons
- **Chart.js 4.5** - Data visualization

### SEO & Meta
- **React Helmet Async 2.0** - Meta tag management

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 🌐 Deployment

### GitHub Pages

1. Update `vite.config.ts`:
   ```typescript
   export default defineConfig({
     base: '/portfolio-v3/',
     // ...
   })
   ```

2. Build and deploy:
   ```bash
   npm run build
   # Deploy the 'dist' folder to GitHub Pages
   ```

### Vercel / Netlify

Simply connect your GitHub repository and these platforms will auto-detect the Vite configuration.

## Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Anurup Chandra Mondal**
- GitHub: [@AnurupMondal](https://github.com/AnurupMondal)
- LinkedIn: [Anurup Mondal](https://www.linkedin.com/in/anurup-mondal/)

## Acknowledgments

- Icons from [Lucide](https://lucide.dev/) and [React Icons](https://react-icons.github.io/react-icons/)
- Contact form powered by [Web3Forms](https://web3forms.com)

---

⭐ **Star this repo if you found it helpful!**
