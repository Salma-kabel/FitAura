const Exercise = require('../models/Exercise');
const RoutineExercise = require('../models/RoutineExercise');
const User = require('../models/User');

exports.logExercise = async (req, res) => {
  const { name, duration, description, caloriesBurned, date } = req.body;
  const userId = req.user.id;

  try {
    const exercise = await Exercise.create({
      userId,
      name,
      duration,
      description,
      caloriesBurned,
      date,
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
    const adminExercises = await Exercise.findAll({
      where: {
        userId: null,
      },
    });

    const userExercises = await Exercise.findAll({
      where: {
        userId: userId,
      },
    });

    const exercises = [...adminExercises, ...userExercises];
    res.status(200).json(exercises);
  } catch (error) {
    console.error('Error retrieving exercises:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.getUserRoutine = async (req, res) => {
  const userId = req.user.id;

  try {
    const userExercises = await RoutineExercise.findAll({
      where: { userId },
      include: [{ model: Exercise }],
    });
    res.status(200).json(userExercises);
  } catch (error) {
    console.error('Error retrieving user routine:', error);
    res.status(500).json({ error: error.message });
  }
};
