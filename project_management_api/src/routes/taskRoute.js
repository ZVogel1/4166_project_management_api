import express from 'express';
import { getAllTasksHandler, getTaskByIdHandler, createTaskHandler, updateTaskHandler, deleteTaskHandler } from '../controllers/taskController.js';
import { authenticate } from '../middleware/authenticate.js';
import { validateCreateTask, validateUpdateTask } from '../middleware/taskValidators.js';

const router = express.Router();

router.get('/', authenticate, getAllTasksHandler);
router.get('/:id', authenticate, getTaskByIdHandler);
router.post('/', authenticate, validateCreateTask, createTaskHandler);
router.put('/:id', authenticate, validateUpdateTask, updateTaskHandler);
router.delete('/:id', authenticate, deleteTaskHandler);

export default router;