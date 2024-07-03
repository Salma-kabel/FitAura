const Routine = require('../models/Routine');
const RoutineExercise = require('../models/RoutineExercise');
const Exercise = require('../models/Exercise');

exports.createRoutine = async (req, res) => {
  const { name } = req.body;
  console.log("User in createRoutine:", req.user);
  const userId = req.user.userId;

  try {
    const routine = await Routine.create({
      userId,
      name,
    });
    res.status(201).json(routine);
  } catch (error) {
    console.error('Error creating routine:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.addExerciseToRoutine = async (req, res) => {
  const { routineId, exerciseId, day } = req.body;
  const userId = req.user.userId;

  try {
    const routine = await Routine.findOne({ where: { id: routineId, userId } });
    if (!routine) {
      return res.status(404).json({ error: 'Routine not found' });
    }

    const exercise = await Exercise.findByPk(exerciseId);
    if (!exercise) {
      return res.status(404).json({ error: 'Exercise not found' });
    }

    const routineExercise = await RoutineExercise.create({
      routineId,
      exerciseId,
      day,
    });

    res.status(201).json(routineExercise);
  } catch (error) {
    console.error('Error adding exercise to routine:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.getRoutine = async (req, res) => {
  const routineId = req.params.id;
  const userId = req.user.userId;

  try {
    const routine = await Routine.findOne({
      where: { id: routineId, userId },
      include: {
        model: RoutineExercise,
        include: Exercise,
      },
    });

    if (!routine) {
      return res.status(404).json({ error: 'Routine not found' });
    }

    res.status(200).json(routine);
  } catch (error) {
    console.error('Error retrieving routine:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.getUserRoutines = async (req, res) => {
  const userId = req.user.userId;

  try {
    const routines = await Routine.findAll({
      where: { userId },
      include: {
        model: RoutineExercise,
        include: Exercise,
      },
    });

    res.status(200).json(routines);
  } catch (error) {
    console.error('Error retrieving routines:', error);
    res.status(500).json({ error: error.message });
  }
};
