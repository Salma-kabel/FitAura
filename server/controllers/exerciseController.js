const Exercise = require('../models/Exercise');
const UserExercise = require('../models/UserExercise');
const User = require('../models/User');

exports.addExerciseToRoutine = async (req, res) => {
  const { exerciseId } = req.body;
  const userId = req.user.id;

  try {
    const exercise = await Exercise.findByPk(exerciseId);
    if (!exercise) {
      return res.status(404).json({ error: 'Exercise not found' });
    }

    const userExercise = await UserExercise.create({
      userId,
      exerciseId,
    });

    res.status(201).json(userExercise);  
  } catch (error) {
    console.error('Error adding exercise to routine:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.getUserRoutine = async (req, res) => {
  const userId = req.user.id;

  try {
    const userExercises = await UserExercise.findAll({
      where: { userId },
      include: [{ model: Exercise }],
    });
    res.status(200).json(userExercises);
  } catch (error) {
    console.error('Error retrieving user routine:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.logExercise = async (req, res) => {
  const { userId, name, duration, description, caloriesBurned, date } = req.body;

  try {
    const user = await User.findByPk(userId);
    if (!user || !user.isAdmin) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

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
    const exercises = await Exercise.findAll({ where: { userId } });
    res.status(200).json(exercises);
  } catch (error) {
    console.error('Error retrieving exercises:', error);
    res.status(500).json({ error: error.message});
  }
};
