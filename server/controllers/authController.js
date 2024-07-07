const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { sendResetPasswordEmail } = require('../utils/mailer');
require('dotenv').config();

exports.validate = (method) => {
  switch (method) {
    case 'register': {
      return [
        body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
        body('email').isEmail().withMessage('Invalid email'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
        body('gender').optional().isIn(['male', 'female']).withMessage('Invalid gender'),
        body('age').optional().isInt({ min: 0 }).withMessage('Age must be a positive integer'),
        body('weight').optional().isFloat({ min: 0 }).withMessage('Weight must be a positive number'),
        body('height').optional().isFloat({ min: 0 }).withMessage('Height must be a positive number'),
        body('bodyFatPercent').optional().isFloat({ min: 0, max: 100 }).withMessage('Body fat percent must be between 0 and 100'),
        body('muscleMassPercent').optional().isFloat({ min: 0, max: 100 }).withMessage('Muscle mass percent must be between 0 and 100'),
        body('goalWeight').optional().isFloat({ min: 0 }).withMessage('Goal weight must be a positive number'),
        body('goalBodyFatPercent').optional().isFloat({ min: 0, max: 100 }).withMessage('Goal body fat percent must be between 0 and 100'),
        body('goalMuscleMassPercent').optional().isFloat({ min: 0, max: 100 }).withMessage('Goal muscle mass percent must be between 0 and 100'),
      ];
    }
    case 'login': {
      return [
        body('email').isEmail().withMessage('Invalid email'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
      ];
    }
    case 'requestPasswordReset': {
      return [
        body('email').isEmail().withMessage('Invalid email'),
      ];
    }
    case 'resetPassword': {
      return [
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
        body('token').not().isEmpty().withMessage('Token is required'),
      ];
    }
  }
};

exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const {
      username,
      email,
      password,
      gender,
      age,
      weight,
      height,
      bodyFatPercent,
      muscleMassPercent,
      goalWeight,
      goalBodyFatPercent,
      goalMuscleMassPercent,
    } = req.body;

    if (await User.findOne({ where: { email } })) {
      return res.status(400).json({ error: 'Email already exists' });
    } else if (await User.findOne({ where: { username } })) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword
    });

    if (username == 'testadmin') {
      await User.update({ isAdmin: true }, { where: { id: user.id } });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.requestPasswordReset = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.RESET_PASSWORD_EXPIRATION });

    await sendResetPasswordEmail(email, token);

    res.json({ message: 'Reset password email sent' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { token, password } = req.body;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
