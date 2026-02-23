import express from 'express';
import authMiddleware from '../middleware/auth.js';
import { checkAuth, loginUser, registerUser } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/register', registerUser)

router.post('/login', loginUser)

router.get('/me', authMiddleware, checkAuth)

export default router