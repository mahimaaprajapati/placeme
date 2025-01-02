const express = require('express');
const router = express.Router();
const db = require('../db/db'); // Database connection

// Fetch all students
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM students');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching students');
    }
});

// Add a new student
router.post('/', async (req, res) => {
    const { name, email, phone, resume_link, skills } = req.body;
    try {
        await db.query(
            'INSERT INTO students (name, email, phone, resume_link, skills) VALUES (?, ?, ?, ?, ?)',
            [name, email, phone, resume_link, skills]
        );
        res.status(201).send('Student added successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error adding student');
    }
});

module.exports = router;
