const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const {
  createRoutine,
  updateRoutine,
  deleteRoutine,
  addExerciseToRoutine,
  getRoutines,
  getRoutine,
  getRoutineExercises,
} = require('../controllers/routineController');

router.post('/', authMiddleware, createRoutine);
router.post('/exercises', authMiddleware, addExerciseToRoutine);
router.get('/exercises', authMiddleware, getRoutineExercises);
router.get('/:id', authMiddleware, getRoutine);
router.get('/', authMiddleware, getRoutines);
router.put('/:id', authMiddleware, updateRoutine);
router.delete('/:id', authMiddleware, deleteRoutine);

module.exports = router;
