import express from 'express';
import authMiddleware from '../middleware/auth.js';
import { createDiscussion, deleteDiscussion, editDiscussion, getDiscussionInfo, getDiscussions, getEditInfo, getMyDiscussions, getSearchDiscussions, getTopDiscussions } from '../controllers/discussion.controller.js';

const router = express.Router();

router.get('/', getDiscussions)

router.get('/top', getTopDiscussions)

router.get('/discussion/:id', getDiscussionInfo )

router.get('/mydiscussions',authMiddleware, getMyDiscussions)

router.get(`/getedit/:id`,authMiddleware, getEditInfo)

router.get("/search", getSearchDiscussions)

router.delete('/delete/:id', authMiddleware, deleteDiscussion) 

router.post('/create',authMiddleware, createDiscussion)

router.put('/edit/:id', editDiscussion)

export default router