const express = require('express');
const db = require('../db');
const router = express.Router();

// Get dashboard data
router.get('/', (req, res) => {
    const user_id = req.session.user_id;

    const sql = "SELECT * FROM DASHBOARD WHERE USER_ID = ?";
    db.query(sql, [user_id], (err, results) => {
        if (err) {
            return res.status(500).send('Error: ' + err);
        }
        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.json({ TOTAL_CALORIES_BURNED: 0, TOTAL_CALORIES_CONSUMED: 0 });
        }
    });
});

module.exports = router;
