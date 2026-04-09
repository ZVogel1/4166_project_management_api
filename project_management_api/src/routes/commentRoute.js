import express from 'express';
import { getAllCommentsHandler, getCommentByIdHandler, createCommentHandler, updateCommentHandler, deleteCommentHandler } from '../controllers/commentController.js';
import { authenticate } from '../middleware/authenticate.js';
import { validateCreateComment, validateUpdateComment } from '../middleware/commentValidators.js';

const router = express.Router();

router.get('/', authenticate, getAllCommentsHandler);
router.get('/:id', authenticate, getCommentByIdHandler);
router.post('/', authenticate, validateCreateComment, createCommentHandler);
router.put('/:id', authenticate, validateUpdateComment, updateCommentHandler);
router.delete('/:id', authenticate, deleteCommentHandler);

export default router;