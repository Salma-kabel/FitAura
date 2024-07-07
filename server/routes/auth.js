const express = require('express');
const { register, login, validate } = require('../controllers/authController');

const router = express.Router();

router.post('/register', validate('register'), register);
router.post('/login', validate('login'), login);

module.exports = router;
