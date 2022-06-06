// Node modules
const express = require('express');
const mysql = require('mysql2');

// Imported functions
const inputCheck = require('./utils/inputCheck');

// Server setup
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

// Get all candidates
app.get('/api/candidates', (req, res) => {
    const sql = `
        SELECT candidates.*, parties.name AS party_name
        FROM candidates
        LEFT JOIN parties 
        ON candidates.party_id = parties.id
    `;

    db.query(sql, (err, rows) => {
        if(err){
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'Success',
            data: rows
        });
    });
});

// Get single candidate
app.get('/api/candidate/:id', (req, res) => {
    const sql = `
    SELECT candidates.*, parties.name AS party_name
    FROM candidates
    LEFT JOIN parties
    ON candidates.party_id = parties.id 
    WHERE candidates.id = ?
    `;
    const params = [req.params.id];

    db.query(sql, params, (err, row) => {
        if(err) {
            res.status(400).json({ error: err.message });
            return;
        }

        res.json({
            message: 'Success',
            data: row
        });
    });
});

// Delete a candidate
app.delete('/api/candidate/:id', (req, res) => {
    const sql = `DELETE FROM candidates WHERE id =?`
    const params = [req.params.id];

    db.query(sql, params, (err, result) => {
        if(err){
            res.statusMessage(400).json({ error: res.message });
        } else if (!result.affectedRows) {
            res.json({ message: 'Candidate not found'});
        } else {
            res.json({
                message: 'Deleted',
                changes: result.affectedRows,
                id: req.params.id
            });
        }
    });
});

// Create a candidate
app.post('/api/candidate', ({ body }, res) => {
    const errors = inputCheck(body, 'first_name', 'last_name', 'industry_connected');

    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }

    const sql = `
        INSERT INTO candidates (first_name, last_name, industry_connected)
        VALUES (?,?,?)
    `;
    const params = [body.first_name, body.last_name, body.industry_connected];

    db.query(sql, params, (err, results) => {
        if (err) {
            console.log(err);
        }

        res.json({
            message: 'Success',
            data: body
        });
    });
});

// Update a candidate's party
app.put('/api/candidate/:id', (req, res) => {
    const errors = inputCheck(req.body, 'party_id');

    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }
    const sql = `
        UPDATE candidates SET party_id = ?
        WHERE id = ?
    `;
    const params = [req.body.party_id, req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ err: err.message })
         // check if a record was found
        } else if (!result.affectedRows) {
            res.json({
                message: 'Candidate not found'
            });
        } else {
            res.json({
                message: 'Success',
                data: req.body,
                changes: result.affectedRows,
            });
        }
    });
});

// Get all parties
app.get('/api/parties', (req, res) => {
    const sql = `SELECT * FROM parties`;

    db.query(sql, (err, rows) => {
        if(err){
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'Success',
            data: rows
        });
    });
});

// get single party
app.get('/api/party/:id', (req, res) => {
    const sql = `
        SELECT * FROM parties
        WHERE id = ?
    `;
    const params = [req.params.id];

    db.query(sql, params, (err, row) => {
        if(err){
            res.status(400).json({ error: err.message });
            return;
        }

        res.json({
            message: 'Success',
            data: row
        });
    });
});

// delete a party
app.delete('/api/party/:id', (req, res) => {
    const sql = `
        DELETE FROM parties
        WHERE id = ?
    `;
    const params = [req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: res.message });

         // check anything was deleted
        } else if (!result.affectedRows) {
            res.json({
                message: 'Party not found'
            });
        } else {
            res.json({
                message: 'Deleted',
                changes: result.affectedRows,
                id: req.params.id
            });
        }
    });
});



// Default response for any other request (Not Found)
app.use((req,res) => {
    res.status(404).end();
});



// server launch
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});