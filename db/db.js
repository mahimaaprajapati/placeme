// db.js
const mysql = require('mysql2');  // Import the MySQL library

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',  // Replace with your database username
    password: 'Mahi@89231',  // Replace with your database password
    database: 'placement_cell'  // Replace with your actual database name
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Connected to the database');
    }
});

module.exports = db;  // Export the db object for use in other files
