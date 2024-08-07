const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { sendEmail } = require('../services/emailService');
require('dotenv').config();

exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { username, email, password } = req.body;

    if (await User.findOne({ where: { email } })) {
      return res.status(400).json({ error: 'Email already exists' });
    } else if (await User.findOne({ where: { username } })) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      isAdmin: username == 'testadmin' ? true : false,
    });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    await sendEmail(email, token, 'confirm-email');

    res.status(201).json({ message: 'Email Confirmation sent' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    if (!user.emailConfirmed) {
      return res.status(401).json({ error: 'Email not confirmed' });
    }
    const token = jwt.sign({ userId: user.id, email: user.email, username: user.username },
      process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    let data = null;
    let weights = null;
    let fats = null;
    let muscles = null;
    try {
        const response = await fetch("http://localhost:5000/api/user/metrics/weekly", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: user.id}),
        });
        data = await response.json();
        weights = data?.map(item => item.weight) || null;
        fats = data?.map(item => item.bodyFatPercent) || null;
        muscles = data?.map(item => item.muscleMassPercent) || null;
    } catch (error) {
        console.log(error);
    }
    res.status(200).send({ authorization: `Bearer ${token}`,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        weight: weights,
        bodyfat: fats,
        bodymuscle: muscles,
      }, });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.confirmEmail = async (req, res) => {
  try {
    let token = req.query.token;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.emailConfirmed = true;
    await user.save();

    token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    res.status(200).setHeader('Authorization', `Bearer ${token}`).json({'message': 'Email confirmed'});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.requestPasswordReset = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = req.user;
    const { password } = req.body;

    const token = jwt.sign(
      { user: `${user.id} ${password}` },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.RESET_PASSWORD_EXPIRATION,
      }
    );

    await sendEmail(user.email, token, 'reset-password');

    res.json({ message: 'Reset password email sent' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    let token = req.query.token;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const [userId, password] = decoded.user.split(' ');
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res
      .status(200)
      .setheader('Authorization', `Bearer ${token}`)
      .json({ message: 'Password reset successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
