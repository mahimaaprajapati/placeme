const express = require('express');
const cors = require('cors');
const adzunaRoutes = require('./adzunaRoutes'); // Adzuna API Routes
const studentRoutes = require('./routes/studentRoutes'); // Student-related routes
const fetch= require('node-fetch');
const WebSocket = require('ws');

const app = express();

// Middleware
app.use(express.json()); // Parse JSON request bodies

// CORS Configuration
const allowedOrigins = ['http://localhost:3001', 'http://localhost:3000']; // Update with your frontend origin
app.use(
    cors({
        origin: allowedOrigins,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true, // Allow cookies if needed
    })
);

// API Routes
app.use('/api/jobs/fetch-jobs', adzunaRoutes); // Route for Adzuna job-related operations
app.use('/api/students', studentRoutes); // Route for student-related operations

// WebSocket Server
const wss = new WebSocket.Server({ port: 3001 }); // Use a different port for WebSocket

wss.on('connection', (ws) => {
    console.log('Client connected');

    // Send notification every 10 seconds
    const notificationInterval = setInterval(() => {
        if (ws.readyState === WebSocket.OPEN) {
            ws.send(
                JSON.stringify({
                    type: 'notification',
                    message: 'New job posted by XYZ Company!',
                })
            );
        }
    }, 10000);

    // Handle incoming messages and broadcast to all clients
    ws.on('message', (message) => {
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on('close', () => {
        console.log('Client disconnected');
        clearInterval(notificationInterval); // Avoid memory leaks
    });

    ws.on('error', (err) => {
        console.error('WebSocket error:', err);
    });
});

// Start HTTP Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:3000`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('Shutting down gracefully...');
    wss.clients.forEach((client) => client.close());
    app.close(() => {
        console.log('HTTP server closed');
    });
});
