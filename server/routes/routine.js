const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const {
  createRoutine,
  addExerciseToRoutine,
  getRoutine,
  getUserRoutines,
} = require('../controllers/routineController');

router.post('/create', authMiddleware, createRoutine);
router.post('/add-exercise', authMiddleware, addExerciseToRoutine);
router.get('/:id', authMiddleware, getRoutine);
router.get('/', authMiddleware, getUserRoutines);

module.exports = router;
