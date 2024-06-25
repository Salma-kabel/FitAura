const express = require('express');
const db = require('../db');
const router = express.Router();

// Add exercise
router.post('/add', (req, res) => {
    const { exercise_id, duration_min, date } = req.body;
    const user_id = req.session.user_id;

    const sql = "INSERT INTO USER_EXERCISES (USER_ID, EXERCISE_ID, DURATION_MIN, DATE, CALORIES_BURNED) VALUES (?, ?, ?, ?, 0)";
    db.query(sql, [user_id, exercise_id, duration_min, date], (err, result) => {
        if (err) {
            return res.status(500).send('Error: ' + err);
        }
        res.send('Exercise added successfully!');
    });
});

// Get exercises
router.get('/list', (req, res) => {
    const sql = "SELECT ID, NAME FROM EXERCISES";
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send('Error: ' + err);
        }
        res.json(results);
    });
});

module.exports = router;
