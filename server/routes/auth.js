const express = require('express');
const { register, login } = require('../controllers/userController');

const router = express.Router();

router.post('/register', validate('register'), register);
router.post('/login', validate('login'), login);
router.post('/request-reset-password', validate('requestPasswordReset'), requestPasswordReset);
router.post('/reset-password', validate('resetPassword'), resetPassword);

module.exports = router;
