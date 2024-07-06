const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const {
  logExercise,
  getExercises,
} = require('../controllers/exerciseController');

router.post('/log', authMiddleware, logExercise);
router.get('/', authMiddleware, getExercises);

module.exports = router;
