const Exercise = require('../models/Exercise');
const userExercise = require('../models/userExercise');
require('dotenv').config();

const logExercise = async (req, res) => {
  try {
    const { userId, exerciseId, duration } = req.body;
    exercise = await Exercise.findByPk(exerciseId);
    date = new Date().toISOString().split('T')[0];
    totalCalories = duration * exercise.calories;
    const exerciseLog = await userExercise.create({ userId, exerciseId, duration, date, totalCalories });
    res.status(201).json({ exerciseLog });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = logExercise;