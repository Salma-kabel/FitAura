const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const {
  logExercise,
  getExercises,
  getUserRoutine,
} = require('../controllers/exerciseController');

router.post('/log', authMiddleware, logExercise);
router.get('/', authMiddleware, getExercises);
router.get('/routine', authMiddleware, getUserRoutine);

module.exports = router;
