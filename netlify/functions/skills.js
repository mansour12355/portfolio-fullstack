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

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ success: true, skills })
        };
    }

    // Method not allowed
    return {
        statusCode: 405,
        headers,
        body: JSON.stringify({ error: 'Method not allowed' })
    };
};
