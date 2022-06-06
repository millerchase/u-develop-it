// Setup router
const express = require('express');
const router = express.Router();

// Relative impotrts (DB & Utils)
const db = require('../../db/connections');
const inputCheck =  require('../../utils/inputCheck');


// POST a vote
router.post('/vote', ({ body }, res) => {
    // Data validation
    const errors = inputCheck(body, 'voter_id', 'candidate_id');

    if (errors) {
        res.status(400).json({ error: errors });
    }

    const sql = `INSERT INTO votes (voter_id, candidate_id) VALUES (?,?)`;
    const params = [body.voter_id, body.candidate_id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }

        res.json({
            message: 'Success',
            data: body,
            changes: result.affectedRows
        });
    });
});

// GET all votes
router.get('/votes', (req, res) => {
    const sql = `
        SELECT candidates.*, parties.name AS party_name, COUNT(candidate_id) AS count
        FROM votes
        LEFT JOIN candidates ON votes.candidate_id = candidates.id
        LEFT JOIN parties ON candidates.party_id = parties.id
        GROUP BY candidate_id ORDER BY count DESC;
    `;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }

        res.json({
            message: 'Success',
            data: rows
        });
    });
});

module.exports = router;