const express = require('express');
const {
  updateUser,
  getUser,
  deleteUser,
  getWeeklyMetrics,
} = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, getUser);
router.put('/', authMiddleware, updateUser);
router.delete('/', authMiddleware, deleteUser);
router.get('/metrics/weekly', authMiddleware, getWeeklyMetrics);

module.exports = router;
