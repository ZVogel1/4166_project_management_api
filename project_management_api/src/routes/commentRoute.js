import express from 'express';
import { getAllCommentsHandler, getCommentByIdHandler, createCommentHandler, updateCommentHandler, deleteCommentHandler } from '../controllers/commentController.js';

const router = express.Router();

router.get('/', getAllCommentsHandler);
router.get('/:id', getCommentByIdHandler);
router.post('/', createCommentHandler);
router.put('/:id', updateCommentHandler);
router.delete('/:id', deleteCommentHandler);

export default router;