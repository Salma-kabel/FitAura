const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../db');
const router = express.Router();

// Register
router.post('/register', (req, res) => {
    const { email, first_name, last_name, password } = req.body;
    const password_hash = bcrypt.hashSync(password, 10);

    const sql = "INSERT INTO USERS (EMAIL, FIRST_NAME, LAST_NAME, PASSWORD_HASH, VALID_EMAIL) VALUES (?, ?, ?, ?, 1)";
    db.query(sql, [email, first_name, last_name, password_hash], (err, result) => {
        if (err) {
            return res.status(500).send('Error: ' + err);
        }
        res.send('Registration successful!');
    });
});

// Login
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    const sql = "SELECT * FROM USERS WHERE EMAIL = ?";
    db.query(sql, [email], (err, results) => {
        if (err) {
            return res.status(500).send('Error: ' + err);
        }
        if (results.length === 0) {
            return res.status(400).send('No user found with that email.');
        }

        const user = results[0];
        if (bcrypt.compareSync(password, user.PASSWORD_HASH)) {
            req.session.user_id = user.ID;
            res.send('success');
        } else {
            res.status(400).send('Invalid password.');
        }
    });
});

module.exports = router;
