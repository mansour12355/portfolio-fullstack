# Full-Stack Portfolio Website

A stunning, modern portfolio website built with HTML5, CSS3, and Node.js featuring glassmorphism design, smooth animations, and a full-stack backend.

## ✨ Features

- **Modern Design**: Glassmorphism effects, gradient animations, and smooth transitions
- **Fully Responsive**: Optimized for all devices from mobile to desktop
- **Dark/Light Theme**: Toggle between themes with persistent preference
- **Interactive Elements**: Parallax effects, hover animations, and scroll-based animations
- **Contact Form**: Functional contact form with backend API
- **Performance Optimized**: Debounced scroll events and efficient animations
- **SEO Ready**: Proper meta tags and semantic HTML

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone or download this repository
2. Navigate to the project directory:
```bash
cd portfolio-fullstack
```

3. Install dependencies:
```bash
npm install
```

4. Create a `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

5. Start the development server:
```bash
npm run dev
```

6. Open your browser and visit:
```
http://localhost:3000
```

## 📦 Project Structure

```
portfolio-fullstack/
├── index.html          # Main HTML file
├── styles.css          # CSS3 styles with modern features
├── script.js           # Interactive JavaScript
├── server.js           # Express backend server
├── package.json        # Dependencies and scripts
├── .env.example        # Environment variables template
├── .gitignore          # Git ignore rules
└── README.md           # This file
```

## 🎨 Customization

### Personal Information

Edit `index.html` to update:
- Your name and title
- About section content
- Project details
- Skills and technologies
- Contact information

### Colors and Theme

Modify CSS variables in `styles.css`:
```css
:root {
    --accent-primary: #8b5cf6;
    --accent-secondary: #ec4899;
    --accent-tertiary: #06b6d4;
    /* ... more variables */
}
```

### API Endpoints

The server provides these endpoints:
- `GET /api/health` - Server health check
- `POST /api/contact` - Contact form submission
- `GET /api/projects` - Get projects data
- `GET /api/skills` - Get skills data

## 🛠️ Technologies Used

### Frontend
- HTML5
- CSS3 (Custom Properties, Grid, Flexbox, Animations)
- Vanilla JavaScript (ES6+)
- Google Fonts (Inter, Space Grotesk)

### Backend
- Node.js
- Express.js
- CORS
- Body Parser
- dotenv

## 📱 Responsive Breakpoints

- Desktop: 1024px and above
- Tablet: 768px - 1023px
- Mobile: 480px - 767px
- Small Mobile: Below 480px

## 🌟 Key Features Explained

### Glassmorphism Design
Modern frosted glass effect using `backdrop-filter` and semi-transparent backgrounds.

### Gradient Animations
Smooth animated gradient orbs in the hero section with floating animations.

### Intersection Observer
Efficient scroll-based animations using the Intersection Observer API.

### Theme Toggle
Persistent dark/light theme switching with localStorage.

### Mobile Menu
Responsive hamburger menu with smooth transitions.

## 📝 Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests (to be implemented)

## 🚀 Deployment

### Deploy to Heroku

1. Create a Heroku account
2. Install Heroku CLI
3. Run:
```bash
heroku create your-portfolio-name
git push heroku main
```

### Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`

### Deploy to Netlify

1. Build your project
2. Drag and drop the folder to Netlify

## 🔒 Environment Variables

Create a `.env` file with:
```
PORT=3000
NODE_ENV=production
```

## 📄 License

MIT License - feel free to use this for your own portfolio!

## 👤 Author

Alex Johnson
- Email: alex.johnson@example.com
- GitHub: @alexjohnson
- LinkedIn: linkedin.com/in/alexjohnson

## 🙏 Acknowledgments

- Design inspiration from modern portfolio trends
- Icons from inline SVG
- Fonts from Google Fonts

---

Made with ❤️ and lots of CSS3
