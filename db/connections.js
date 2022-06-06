const mysql = require('mysql2');

// connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'cmiller',
        password: 'awdxsjilmk',
        database: 'election'
    },
);

module.exports = db;