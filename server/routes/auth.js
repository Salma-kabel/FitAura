const express = require('express');
const {
  register,
  login,
  requestPasswordReset,
  resetPassword,
  confirmEmail,
} = require('../controllers/authController');
const { validate } = require('../middlewares/validation');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', validate('register'), register);
router.post('/login', login);
router.post(
  '/request-reset-password',
  validate('requestPasswordReset'),
  authMiddleware,
  requestPasswordReset
);
router.get('/reset-password', resetPassword);
router.get('/confirm-email', confirmEmail);

module.exports = router;
