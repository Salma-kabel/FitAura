const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

exports.updateUser = async (req, res) => {
  const id = req.body.id;
  const user = await User.findOne({ where: { id: id } });
  const attributes = [
    "email",
    "username",
    "gender",
    "age",
    "weight",
    "height",
    "waterpercent",
    "bodyFatPercent",
    "muscleMassPercent",
    "goalWeight",
    "goalBodyFatPercent",
    "goalMuscleMassPercent",
  ];

  try {
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
  const id = req.body.id;
  const user = await User.findOne({ where: { id: id } });
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
