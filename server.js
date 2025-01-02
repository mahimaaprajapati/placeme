const express = require('express');
const cors = require('cors');
const studentRoutes = require('./routes/studentRoutes');
const jobRoutes = require('./routes/jobRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const interviewRoutes = require('./routes/interviewRoutes');
const fs = require('fs');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io'); // Import Socket.IO

const app = express();
const server = http.createServer(app);  // Create the server
const io = socketIo(server);  // Initialize Socket.IO with the server

// Middleware
app.use(express.json()); // To parse JSON request bodies
app.use(cors());  // Enable CORS for cross-origin requests
app.use(express.static('public'));

// Use routes
app.use('/api/students', studentRoutes);  // This will correctly map to studentRoutes.js
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/interviews', interviewRoutes);

// Route to fetch challenges
app.get('/api/challenges', (req, res) => {
    const challengesDirectory = path.join(__dirname, 'freeCodeCamp/curriculum/challenges/_meta/basic-javascript');  // Update path if needed

    fs.readdir(challengesDirectory, (err, files) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading challenge files', error: err });
        }

        let challenges = [];
        files.forEach((file) => {
            if (file.endsWith('.json')) {
                const filePath = path.join(challengesDirectory, file);
                const challengeData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
                challenges.push(challengeData);
            }
        });

        res.json(challenges);  // Send challenge data as a JSON response
    });
});

// Socket.IO connection
io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
