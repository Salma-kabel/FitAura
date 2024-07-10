const express = require('express');
const {
  setGoal,
  updateGoal,
  deleteGoal,
  viewProgress,
  viewGoals,
  viewGoal,
} = require('../controllers/goalController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, setGoal);
router.put('/:id', authMiddleware, updateGoal);
router.delete('/:id', authMiddleware, deleteGoal);
router.get('/:id/progress', authMiddleware, viewProgress);
router.get('/:id', authMiddleware, viewGoal);
router.get('/', authMiddleware, viewGoals);

module.exports = router;
