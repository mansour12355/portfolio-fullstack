const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from frontend folder
app.use(express.static(path.join(__dirname, 'frontend')));

// API Routes
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Portfolio server is running',
        timestamp: new Date().toISOString()
    });
});

// Contact form endpoint
app.post('/api/contact', (req, res) => {
    const { name, email, subject, message } = req.body;

    // Validate input
    if (!name || !email || !subject || !message) {
        return res.status(400).json({
            success: false,
            message: 'All fields are required'
        });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid email address'
        });
    }

    // Log the contact form submission
    console.log('Contact form submission:', {
        name,
        email,
        subject,
        message,
        timestamp: new Date().toISOString()
    });

    // In a real application, you would:
    // 1. Save to database
    // 2. Send email notification
    // 3. Use a service like SendGrid, Mailgun, or Nodemailer

    res.json({
        success: true,
        message: 'Thank you for your message! I will get back to you soon.'
    });
});

// Projects API endpoint (for future expansion)
app.get('/api/projects', (req, res) => {
    const projects = [
        {
            id: 1,
            title: 'E-Commerce Platform',
            description: 'A full-featured e-commerce platform with real-time inventory management, payment processing, and admin dashboard.',
            technologies: ['React', 'Node.js', 'MongoDB'],
            github: 'https://github.com/username/ecommerce',
            demo: 'https://demo.example.com',
            image: '/images/project1.jpg'
        },
        {
            id: 2,
            title: 'Task Management App',
            description: 'Collaborative task management tool with real-time updates, team collaboration features, and analytics dashboard.',
            technologies: ['Vue.js', 'Firebase', 'Tailwind'],
            github: 'https://github.com/username/taskmanager',
            demo: 'https://demo.example.com',
            image: '/images/project2.jpg'
        },
        {
            id: 3,
            title: 'Social Media Dashboard',
            description: 'Analytics dashboard for social media management with data visualization, scheduling, and performance tracking.',
            technologies: ['Next.js', 'TypeScript', 'PostgreSQL'],
            github: 'https://github.com/username/socialdashboard',
            demo: 'https://demo.example.com',
            image: '/images/project3.jpg'
        }
    ];

    res.json({ success: true, projects });
});

// Skills API endpoint (for future expansion)
app.get('/api/skills', (req, res) => {
    const skills = {
        frontend: [
            { name: 'React', level: 90 },
            { name: 'Vue.js', level: 85 },
            { name: 'CSS3/SASS', level: 95 },
            { name: 'TypeScript', level: 88 }
        ],
        backend: [
            { name: 'Node.js', level: 92 },
            { name: 'Express', level: 90 },
            { name: 'Python', level: 80 },
            { name: 'GraphQL', level: 75 }
        ],
        database: [
            { name: 'MongoDB', level: 87 },
            { name: 'PostgreSQL', level: 85 },
            { name: 'Redis', level: 78 },
            { name: 'Firebase', level: 82 }
        ],
        tools: [
            { name: 'Git', level: 93 },
            { name: 'Docker', level: 80 },
            { name: 'AWS', level: 75 },
            { name: 'CI/CD', level: 82 }
        ]
    };

    res.json({ success: true, skills });
});

// Serve index.html for all other routes (SPA support)
// Note: Netlify handles this via redirects in netlify.toml
// app.get('/*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
// });

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({
        success: false,
        message: 'Internal server error'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`
╔═══════════════════════════════════════════╗
║                                           ║
║   🚀 Portfolio Server Running!            ║
║                                           ║
║   📍 Local:   http://localhost:${PORT}      ║
║   🌐 Network: http://0.0.0.0:${PORT}        ║
║                                           ║
║   Press Ctrl+C to stop                    ║
║                                           ║
╚═══════════════════════════════════════════╝
    `);
});

module.exports = app;
