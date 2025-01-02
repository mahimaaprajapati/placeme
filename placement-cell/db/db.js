const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',        // Replace with your database host
    user: 'root',             // Replace with your database username
    password: 'your_password',// Replace with your database password
    database: 'placement_cell', // Replace with your database name
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool.promise();
