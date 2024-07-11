const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const UserMetric = require('../models/UserMetric');
const { Op } = require('sequelize');
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
    if (email && await User.findOne({ where: { email } })) {
      return res.status(400).json({ error: 'Email already exists' });
    } else if (username && await User.findOne({ where: { username } })) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    let updatedMetrics = {};

    attributes.forEach((attribute) => {
      if (req.body[attribute] !== undefined) {
        user[attribute] = req.body[attribute];
        if ([ 'weight', 'bodyFatPercent', 'muscleMassPercent' ].includes(attribute)) {
          updatedMetrics[attribute] = req.body[attribute];
        }
      }
    });

    await user.save();

    if (Object.keys(updatedMetrics).length > 0) {
      await UserMetric.create({
        userId: user.id,
        weight: updatedMetrics.weight,
        bodyFatPercent: updatedMetrics.bodyFatPercent,
        muscleMassPercent: updatedMetrics.muscleMassPercent,
        recordedAt: new Date(),
      });
    }

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

exports.getWeeklyMetrics = async (req, res) => {
  const userId = req.user.id;

  try {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const metrics = await UserMetric.findAll({
      where: {
        userId,
        recordedAt: {
          [Op.gte]: oneWeekAgo,
        },
      },
      order: [
        [ 'recordedAt', 'ASC' ],
      ],
    });

    res.status(200).json(metrics);
  } catch (error) {
    console.error('Error getting weekly metrics', error);
    res.status(500).json({ error: error.message });
  }
};
