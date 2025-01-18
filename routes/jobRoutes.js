const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

// Create a MySQL connection pool
const db = mysql.createPool({
    host: 'localhost',      // Your MySQL host
    user: 'root',           // Your MySQL username
    password: 'Mahi@89231',           // Your MySQL password
    database: 'placement_cell' // Your MySQL database name
});

// POST route for posting new jobs
router.post('/post-job', (req, res) => {
    const { title, company, description, location } = req.body;

    // SQL query to insert a new job posting
    const query = `
        INSERT INTO jobs (title, company_name, description, location, posted_date)
        VALUES (?, ?, ?, ?, NOW())
    `;

    // Execute the query
    db.query(query, [title, company, description, location], (err, result) => {
        if (err) {
            console.error('Error inserting job:', err);
            return res.status(500).json({ message: 'Failed to post job', error: err.message });
        }

        // Emit a real-time event to all connected clients about the new job posting
        io.emit('newJob', { id: result.insertId, title, company, description, location });

        // Send response back to the client
        res.status(201).json({ message: 'Job posted successfully', jobId: result.insertId });
    });
});

module.exports = router;

