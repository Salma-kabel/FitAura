const express = require('express');
const {
  updateUser,
  getUser,
  deleteUser,
  getWeeklyMetrics,
} = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, getUser);
router.put('/', updateUser);
router.delete('/', authMiddleware, deleteUser);
router.post('/metrics/weekly', getWeeklyMetrics);

module.exports = router;
