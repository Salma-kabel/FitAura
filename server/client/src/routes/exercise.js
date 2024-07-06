const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const {
  logExercise,
  getExercises,
  addExerciseToRoutine,
  getUserRoutine,
} = require('../controllers/exerciseController');

router.post('/log', authMiddleware, logExercise);
router.get('/', authMiddleware, getExercises);
router.post('/routine', authMiddleware, addExerciseToRoutine);
router.get('/routine', authMiddleware, getUserRoutine);

module.exports = router;
