const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const User = require('../models/User');

const router = express.Router();

router.get('/dashboard', authMiddleware, async (req, res) => {
  try {
    const user = await User.findByPk(req.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: `Welcome ${user.username}` });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
