const Exercise = require('../models/Exercise');
const Routine = require('../models/Routine');
const User = require('../models/User');

exports.logExercise = async (req, res) => {
  const user = req.user;
  const { name, duration, description, caloriesBurned } = req.body;

  try {
    const exercise = await Exercise.create({
      name,
      duration,
      description,
      caloriesBurned,
    });

    await user.addExercise(exercise);

    res.status(201).json({
      ...exercise.toJSON(),
      userId: user.id,
    });
  } catch (error) {
    console.error('Error logging exercise', error);
    res.status(500).json({ error: error.message });
  }
};

exports.updateExercise = async (req, res) => {
  const user = req.user;
  const userId = user.id;
  const attributes = ['name', 'duration', 'description', 'caloriesBurned'];
  const exerciseId = req.params.id;

  try {
    const exercise = await Exercise.findOne({ where: { id: exerciseId, userId } });
    if (!exercise) {
      return res.status(404).json({ error: "You can't access this Exercise" });
    }
    attributes.forEach((attribute) => {
      if (req.body[attribute] !== undefined) {
        exercise[attribute] = req.body[attribute];
      }
    });

    await exercise.save();
    res.status(200).json(exercise);
  } catch (error) {
    console.error('Error Updating user Exercise information', error);
    res.status(500).json({ error: error.message });
  }
};

exports.deleteExercise = async (req, res) => {
  const user = req.user;
  const userId = user.id;
  const exerciseId = req.params.id;

  try {
    const exercise = await Exercise.findOne({ where: { id: exerciseId, userId } });
    if (!exercise) {
      return res.status(404).json({ error: "You can't access this Exercise" });
    }
    console.log(exercise);
    await Exercise.destroy({where: { id: exerciseId }});
    res.status(200).json({ Success: 'Exercise deleted successfully' });
  } catch (error) {
    console.error('Error deleting exercise information', error);
    res.status(500).json({ error: error.message });
  }
};
exports.getExercises = async (req, res) => {
  const user = req.user;
  const userId = user.id;

  try {
    const adminExercises = await Exercise.findAll({
      include: [
        {
          model: User,
          as: 'user',
          where: { isAdmin: true },
          attributes: [],
        },
      ],
    });

    const userExercises = user.isAdmin
      ? []
      : await Exercise.findAll({
          where: { userId },
        });
    const exercises = [...adminExercises, ...userExercises];
    if (exercises.length === 0) {
      return res.status(404).json({ error: 'No exercises found' });
    }
    res.status(200).json(exercises);
  } catch (error) {
    console.error('Error retrieving exercises', error);
    res.status(500).json({ error: error.message });
  }
};

exports.getExercise = async (req, res) => {
  const user = req.user;
  const userId = user.id;
  const exerciseId = req.params.id;

  try {
    const adminExercises = await Exercise.findOne({
      where: { id: exerciseId },
      include: [
        {
          model: User,
          as: 'user',
          where: { isAdmin: true },
          attributes: [],
        },
      ],
    });

    const userExercises = user.isAdmin
      ? null
      : await Exercise.findOne({
          where: { userId, id: exerciseId },
        });

    const exercises = adminExercises || userExercises;

    if (exercises) {
      res.status(200).json(exercises);
    } else {
      res.status(403).json({ error: "You can't access this Excercise" });
    }
  } catch (error) {
    console.error('Error retrieving exercises', error);
    res.status(500).json({ error: error.message });
  }
};
