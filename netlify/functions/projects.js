exports.handler = async (event, context) => {
    // Set CORS headers
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Content-Type': 'application/json'
    };

    // Handle preflight OPTIONS request
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: ''
        };
    }

    // Handle GET request
    if (event.httpMethod === 'GET') {
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

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ success: true, projects })
        };
    }

    // Method not allowed
    return {
        statusCode: 405,
        headers,
        body: JSON.stringify({ error: 'Method not allowed' })
    };
};
