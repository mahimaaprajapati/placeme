const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const studentRoutes = require('./routes/studentRoutes'); // Student routes

const app = express();

// Middleware
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(cors()); // Enable CORS for frontend-backend interaction

// Routes
app.use('/api/students', studentRoutes); // Connect student-related routes

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
