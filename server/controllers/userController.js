const User = require('../models/User');

exports.updateUser = async (req, res) => {
  const userId = req.user.id;
  const {
    gender, age, weight, height, bodyFatPercent, muscleMassPercent,
    goalWeight, goalBodyFatPercent, goalMuscleMassPercent
  } = req.body;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.gender = gender || user.gender;
    user.age = age || user.age;
    user.weight = weight || user.weight;
    user.height = height || user.height;
    user.bodyFatPercent = bodyFatPercent || user.bodyFatPercent;
    user.muscleMassPercent = muscleMassPercent || user.muscleMassPercent;
    user.goalWeight = goalWeight || user.goalWeight;
    user.goalBodyFatPercent = goalBodyFatPercent || user.goalBodyFatPercent;
    user.goalMuscleMassPercent = goalMuscleMassPercent || user.goalMuscleMassPercent;

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.error('Error updating user information:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.getUser = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error getting user information:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.getProgress = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const progress = {
      weightProgress: user.goalWeight ? ((user.weight - user.goalWeight) / (user.goalWeight) * 100).toFixed(2) : null,
      bodyFatPercentProgress: user.goalBodyFatPercent ? ((user.bodyFatPercent - user.goalBodyFatPercent) / (user.goalBodyFatPercent) * 100).toFixed(2) : null,
      muscleMassPercentProgress: user.goalMuscleMassPercent ? ((user.muscleMassPercent - user.goalMuscleMassPercent) / (user.goalMuscleMassPercent) * 100).toFixed(2) : null
    };

    res.status(200).json(progress);
  } catch (error) {
    console.error('Error getting user progress:', error);
    res.status(500).json({ error: error.message });
  }
};
