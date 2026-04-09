import express from 'express';
import { getAllTasksHandler, getTaskByIdHandler, createTaskHandler, updateTaskHandler, deleteTaskHandler } from '../controllers/taskController.js';
import { authenticate } from '../middleware/authenticate.js';

const router = express.Router();

router.get('/', authenticate, getAllTasksHandler);
router.get('/:id', authenticate, getTaskByIdHandler);
router.post('/', authenticate, createTaskHandler);
router.put('/:id', authenticate, updateTaskHandler);
router.delete('/:id', authenticate, deleteTaskHandler);

export default router;