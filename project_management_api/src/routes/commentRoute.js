import express from 'express';
import { getAllCommentsHandler, getCommentByIdHandler, createCommentHandler, updateCommentHandler, deleteCommentHandler } from '../controllers/commentController.js';
import { authenticate } from '../middleware/authenticate.js';
import { validateCreateComment, validateUpdateComment } from '../middleware/commentValidators.js';
import { validateResourceId } from '../middleware/resourceIdValidator.js';
import { validateListQuery } from '../middleware/listQueryValidator.js';

const router = express.Router();

router.get('/', authenticate, validateListQuery(['id', 'taskId', 'authorId', 'content', 'createdAt']), getAllCommentsHandler);
router.get('/:id', authenticate, validateResourceId, getCommentByIdHandler);
router.post('/', authenticate, validateCreateComment, createCommentHandler);
router.put('/:id', authenticate, validateResourceId, validateUpdateComment, updateCommentHandler);
router.delete('/:id', authenticate, validateResourceId, deleteCommentHandler);

export default router;