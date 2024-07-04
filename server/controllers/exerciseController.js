const Exercise = require('../models/Exercise');

exports.logExercise = async (req, res) => {
  const { userId, name, duration, description, caloriesBurned, date } = req.body;

  try {
    const exercise = await Exercise.create({
      userId,
      name,
      duration,
      description,
      caloriesBurned,
    });
    res.status(201).json(exercise);
  } catch (error) {
    console.error('Error logging exercise:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.getExercises = async (req, res) => {
  const userId = req.user.id;

  try {
    const exercises = await Exercise.findAll({ where: { userId } });
    res.status(200).json(exercises);
  } catch (error) {
    console.error('Error retrieving exercises:', error);
    res.status(500).json({ error: error.message});
  }
};
