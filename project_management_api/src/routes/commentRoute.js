import express from 'express';
import { getAllCommentsHandler, getCommentByIdHandler, createCommentHandler, updateCommentHandler, deleteCommentHandler } from '../controllers/commentController.js';
import { authenticate } from '../middleware/authenticate.js';

const router = express.Router();

router.get('/', authenticate, getAllCommentsHandler);
router.get('/:id', authenticate, getCommentByIdHandler);
router.post('/', authenticate, createCommentHandler);
router.put('/:id', authenticate, updateCommentHandler);
router.delete('/:id', authenticate, deleteCommentHandler);

export default router;