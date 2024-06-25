const express = require('express');
const db = require('../db');
const router = express.Router();

// Add food
router.post('/add', (req, res) => {
    const { food_name, calories_consumed } = req.body;
    const user_id = req.session.user_id;

    const sql = "INSERT INTO FOOD_CONSUMPTION (USER_ID, FOOD_NAME, CALORIES_CONSUMED) VALUES (?, ?, ?)";
    db.query(sql, [user_id, food_name, calories_consumed], (err, result) => {
        if (err) {
            return res.status(500).send('Error: ' + err);
        }
        res.send('Food consumption added successfully!');
    });
});

module.exports = router;
