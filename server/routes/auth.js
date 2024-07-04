// server/routes/auth.js
import express from 'express';
import { login, register, profile } from '../controllers/authController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/signin', login);
router.post('/signup', register);
router.get('/profile', authMiddleware, profile);

export default router;
