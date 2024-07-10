const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

exports.updateUser = async (req, res) => {
  const user = req.user;
  const {username, email, password} = req.body;
  const attributes = [
    "email",
    "username",
    "gender",
    "age",
    "weight",
    "height",
    "bodyFatPercent",
    "muscleMassPercent",
    "goalWeight",
    "goalBodyFatPercent",
    "goalMuscleMassPercent",
  ];

  try {
    if (await User.findOne({ where: { email } })) {
      return res.status(400).json({ error: 'Email already exists' });
    } else if (await User.findOne({ where: { username } })) {
      return res.status(400).json({ error: 'Username already exists' });
    }
    attributes.forEach((attribute) => {
      if (req.body[attribute] !== undefined) {
        user[attribute] = req.body[attribute];
      }
    });

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.error('Error updating user information', error);
    res.status(500).json({ error: error.message });
  }
};

exports.getUser = async (req, res) => {
  const user = req.user;

  try {
    res.status(200).json(user);
  } catch (error) {
    console.error('Error getting user information', error);
    res.status(500).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  const user = req.user;
  const userId = user.id;

  try {
    await User.destroy({where: { id: userId }});
    res.status(200).json({ Success: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user information', error);
    res.status(500).json({ error: error.message });
  }
};
