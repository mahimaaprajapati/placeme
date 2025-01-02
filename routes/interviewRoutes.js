const express = require('express');
const router = express.Router();
const db = require('../db/db');

// Get all interview schedules
router.get('/interviews', (req, res) => {
    const sql = 'SELECT * FROM interviews';
    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Error fetching interviews', error: err });
        } else {
            res.json(result);
        }
    });
});

// Schedule an interview
router.post('/interviews', (req, res) => {
    const { studentId, jobId, interviewDate } = req.body;
    const sql = 'INSERT INTO interviews (student_id, job_id, interview_date) VALUES (?, ?, ?)';
    db.query(sql, [studentId, jobId, interviewDate], (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Error scheduling interview', error: err });
        } else {
            res.json({ message: 'Interview scheduled successfully!', interviewId: result.insertId });
        }
    });
});

module.exports = router;
