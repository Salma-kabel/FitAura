const Exercise = require('../models/Exercise');

const exerciseInput = async (req, res) => {
  try {
    const { name, description, calories } = req.body;
    if (!description) {
      description = null;
    }
    const newExercise = await Exercise.create({ name, description, calories });
    res.status(201).json({ newExercise });
  } catch(error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = exerciseInput;