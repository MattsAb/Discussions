import express from 'express';
import { addComment, deleteComment } from '../controllers/comment.controller.js';

const router = express.Router();

router.post('/add/:id', addComment)

router.delete('/delete/:id', deleteComment) 

export default router;