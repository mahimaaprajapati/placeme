const express = require('express');
const router = express.Router();

// Mock database (replace with your actual database code)
let jobPostings = [];

// POST route for posting new jobs
router.post('/post-job', (req, res) => {
    const { title, company, description, location } = req.body;

    // Save the new job posting to your database (this is just an example)
    const newJob = { title, company, description, location };
    jobPostings.push(newJob);  // Save job to database in your actual code

    // Emit a real-time event to all connected clients about the new job posting
    // You can emit the event from `server.js`, not `jobRoutes.js`
    io.emit('newJob', newJob);

    // Send response back to the client
    res.status(201).json({ message: 'Job posted successfully' });
});

module.exports = router;
