const UserInfo = require('../models/userInfoModel');

exports.updateUserInfo = async (req, res) => {
  const userId = req.user.id;
  const {
    gender, age, weight, height, bodyFatPercent, muscleMassPercent,
    goalWeight, goalBodyFatPercent, goalMuscleMassPercent
  } = req.body;
  try {
    const userInfo = await UserInfo.findOne({ where: { userId } });
    if (!userInfo) {
      return res.status(404).json({ error: 'User info not found' });
    }

    userInfo.gender = gender || userInfo.gender;
    userInfo.age = age || userInfo.age;
    userInfo.weight = weight || userInfo.weight;
    userInfo.height = height || userInfo.height;
    userInfo.bodyFatPercent = bodyFatPercent || userInfo.bodyFatPercent;
    userInfo.muscleMassPercent = muscleMassPercent || userInfo.muscleMassPercent;
    userInfo.goalWeight = goalWeight || userInfo.goalWeight;
    userInfo.goalBodyFatPercent = goalBodyFatPercent || userInfo.goalBodyFatPercent;
    userInfo.goalMuscleMassPercent = goalMuscleMassPercent || userInfo.goalMuscleMassPercent;

    await userInfo.save();
    res.status(200).json(userInfo);
  } catch (error) {
    console.error('Error updating user information:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.getUserInfo = async (req, res) => {
  const userId = req.user.id;

  try {
    const userInfo = await UserInfo.findOne({ where: { userId } });
    if (!userInfo) {
      return res.status(404).json({ error: 'User info not found' });
    }

    res.status(200).json(userInfo);
  } catch (error) {
    console.error('Error getting user information:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.getProgress = async (req, res) => {
  const userId = req.user.id;

  try {
    const userInfo = await UserInfo.findOne({ where: { userId } });
    if (!userInfo) {
      return res.status(404).json({ error: 'User info not found' });
    }

    const progress = {
      weightProgress: userInfo.goalWeight ? ((userInfo.weight - userInfo.goalWeight) / (userInfo.goalWeight) * 100).toFixed(2) : null,
      bodyFatPercentProgress: userInfo.goalBodyFatPercent ? ((userInfo.bodyFatPercent - userInfo.goalBodyFatPercent) / (userInfo.goalBodyFatPercent) * 100).toFixed(2) : null,
      muscleMassPercentProgress: userInfo.goalMuscleMassPercent ? ((userInfo.muscleMassPercent - userInfo.goalMuscleMassPercent) / (userInfo.goalMuscleMassPercent) * 100).toFixed(2) : null
    };

    res.status(200).json(progress);
  } catch (error) {
    console.error('Error getting user progress:', error);
    res.status(500).json({ error: error.message });
  }
};
