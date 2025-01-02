const express = require('express');
const router = express.Router();
const db = require('../db/db');

// Get all applications
router.get('/applications', (req, res) => {
    const sql = 'SELECT * FROM applications';
    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Error fetching applications', error: err });
        } else {
            res.json(result);
        }
    });
});

// Add a new application
router.post('/applications', (req, res) => {
    const { studentId, jobId, status } = req.body;
    const sql = 'INSERT INTO applications (student_id, job_id, status) VALUES (?, ?, ?)';
    db.query(sql, [studentId, jobId, status], (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Error adding application', error: err });
        } else {
            res.json({ message: 'Application added successfully!', applicationId: result.insertId });
        }
    });
});

module.exports = router;
