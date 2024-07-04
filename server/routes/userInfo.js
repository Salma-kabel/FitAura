const express = require('express');
const { updateUserInfo, getUserInfo } = require('../controllers/userInfoController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/user-info', authMiddleware, updateUserInfo);
router.get('/user-info', authMiddleware, getUserInfo);
router.get('/user-progress', authMiddleware, getProgress);

module.exports = router;
