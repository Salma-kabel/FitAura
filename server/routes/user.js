const express = require('express');
const { updateUser, getUser, getProgress } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, getUser);
router.get('/update', authMiddleware, updateUser);
router.get('/progress', authMiddleware, getProgress);

module.exports = router;
