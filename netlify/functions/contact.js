exports.handler = async (event, context) => {
    // Set CORS headers
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
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

    // Handle POST request
    if (event.httpMethod === 'POST') {
        try {
            const { name, email, subject, message } = JSON.parse(event.body);

            // Validate input
            if (!name || !email || !subject || !message) {
                return {
                    statusCode: 400,
                    headers,
                    body: JSON.stringify({
                        success: false,
                        message: 'All fields are required'
                    })
                };
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return {
                    statusCode: 400,
                    headers,
                    body: JSON.stringify({
                        success: false,
                        message: 'Invalid email address'
                    })
                };
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

            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({
                    success: true,
                    message: 'Thank you for your message! I will get back to you soon.'
                })
            };
        } catch (error) {
            console.error('Error processing contact form:', error);
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({
                    success: false,
                    message: 'Internal server error'
                })
            };
        }
    }

    // Method not allowed
    return {
        statusCode: 405,
        headers,
        body: JSON.stringify({ error: 'Method not allowed' })
    };
};
