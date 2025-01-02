const express = require('express');
const router = express.Router();
const db = require('../db/db.js');

// Define your routes here
// Get all students
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM students';
    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Error fetching students', error: err });
        } else {
            res.json(result);
        }
    });
});

// Add a new student
router.post('/', (req, res) => {
    const { name, rollNumber, department } = req.body;
    const sql = 'INSERT INTO students (name, roll_number, department) VALUES (?, ?, ?)';
    db.query(sql, [name, rollNumber, department], (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Error adding student', error: err });
        } else {
            res.json({ message: 'Student added successfully!', studentId: result.insertId });
        }
    });
});

module.exports = router;
