const Routine = require('../models/Routine');
const Exercise = require('../models/Exercise');
const User = require('../models/User')

exports.createRoutine = async (req, res) => {
  const user = req.user;
  const userId = user.id;
  const { name } = req.body;

  try {
    const routine = await Routine.create({
      userId,
      name,
    });
    res.status(201).json({
      ...routine.toJSON(),
      userId: user.id,
    });
  } catch (error) {
    console.error('Error creating routine', error);
    res.status(500).json({ error: error.message });
  }
};

exports.updateRoutine = async (req, res) => {
  const user = req.user;
  const userId = user.id;
  const { name } = req.body;
  const routineId = req.params.id;

  try {
    const routine = await Routine.findOne({ where: { id: routineId, userId } });
    if (!routine) {
      return res.status(404).json({ error: "You can't access this Routine" });
    }
    routine.name = name || routine.name;

    await routine.save();
    res.status(200).json(routine);
  } catch (error) {
    console.error('Error Updating user Routine information', error);
    res.status(500).json({ error: error.message });
  }
};

exports.deleteRoutine = async (req, res) => {
  const user = req.user;
  const userId = user.id;
  const routineId = req.params.id;

  try {
    const routine = await Routine.findOne({ where: { id: routineId, userId } });
    if (!routine) {
      return res.status(404).json({ error: "You can't access this Routine" });
    }
    await Routine.destroy({ where: { id: routineId } });
    res.status(200).json({ Success: 'Routine deleted successfully' });
  } catch (error) {
    console.error('Error deleting routine information', error);
    res.status(500).json({ error: error.message });
  }
};

exports.getRoutines = async (req, res) => {
  const user = req.user;
  const userId = user.id;

  try {
    const routines = await Routine.findAll({
      where: { userId },
      include: [{ model: Exercise, as: 'exercises' }],
    });
    if (!routines) {
      return res.status(404).json({ error: 'No Routines found' });
    }

    const routinesWithUserId = routines.map((routine) => ({
      ...routine.toJSON(),
      userId,
    }));

    res.status(200).json(routinesWithUserId);
  } catch (error) {
    console.error('Error retrieving routines', error);
    res.status(500).json({ error: error.message });
  }
};

exports.getRoutine = async (req, res) => {
  const user = req.user;
  const userId = user.id;
  const routineId = req.params.id;

  try {
    const routine = await Routine.findOne({
      where: { id: routineId, userId },
      include: [{ model: Exercise, as: 'exercises' }],
    });
    if (!routine) {
      return res.status(404).json({ error: "You can't access this Routine" });
    }

    res.status(200).json(routine);
  } catch (error) {
    console.error('Error retrieving routine', error);
    res.status(500).json({ error: error.message });
  }
};


exports.addExerciseToRoutine = async (req, res) => {
  const user = req.user;
  const userId = user.id;
  const { routineId, exerciseId } = req.body;

  try {
    const routine = await Routine.findOne({ where: { id: routineId, userId } });
    if (!routine) {
      return res.status(404).json({ error: "You can't access this Routine" });
    }

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

    const exercise = adminExercises || userExercises;

    if (exercise) {
      const routineExercise = await routine.addExercise(exercise);
      res.status(200).json(routineExercise);
    } else {
      res.status(403).json({ error: "You can't access this Excercise" });
    }

  } catch (error) {
    console.error('Error adding exercise to routine', error);
    res.status(500).json({ error: error.message });
  }
};


exports.getRoutineExercises = async (req, res) => {
  const { routineId } = req.body

  try {
    const routineExercise = await Exercise.findAll({
      where: { routineId },
    });
    if (!routineExercise) {
      return res.status(404).json({ error: 'Routine Exercise not found' });
    }
    res.status(200).json(routineExercise);
  } catch (error) {
    console.error('Error retrieving user routine', error);
    res.status(500).json({ error: error.message });
  }
};
