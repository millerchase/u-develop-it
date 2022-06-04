const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;

const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'cmiller',
        password: 'awdxsjilmk',
        database: 'election'
    },
    console.log('Connected to the election database.')
);

// Home page request
app.get('/', (req, res) => {
    res.json({
        message: "Hello World!"
    });
});

// Default response for any other request (Not Found)
app.use((req,res) => {
    res.status(404).end();
});


// // query for all candidates from db
// db.query(`SELECT * FROM candidates`, (err, rows) => {
//     console.log(rows);
// });

// // query for a single candidate from db
// db.query(`SELECT * FROM candidates WHERE id = 1`, (err, rows) => {
//     if (err) {
//         console.log(err);
//     }

//     console.log(rows)
// })

// const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected)
//     VALUES (?,?,?,?)`
// ;

// const params = [1, 'Ronald', 'Firbank', 1];

// db.query(sql, params, (err, results) => {
//     if (err) {
//         console.log(err);
//     }

//     console.log(results);
// });

// query to delete candidate from db
// db.query('DELETE FROM candidates WHERE id = ?', 1, (err, result) => {
//     if (err) {
//         console.log(err);
//     }

//     console.log(result);
// });


// server launch
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});