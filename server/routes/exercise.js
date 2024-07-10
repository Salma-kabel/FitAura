const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const {
  logExercise,
  updateExercise,
  deleteExercise,
  getExercises,
  getExercise,
} = require('../controllers/exerciseController');

router.post('/log', authMiddleware, logExercise);
router.get('/', authMiddleware, getExercises);
router.get('/:id', authMiddleware, getExercise);
router.put('/:id', authMiddleware, updateExercise);
router.delete('/:id', authMiddleware, deleteExercise);


module.exports = router;
