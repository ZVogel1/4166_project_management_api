import express from 'express';
import { getAllTasksHandler, getTaskByIdHandler, createTaskHandler, updateTaskHandler, deleteTaskHandler } from '../controllers/taskController.js';
import { authenticate } from '../middleware/authenticate.js';
import { validateCreateTask, validateUpdateTask } from '../middleware/taskValidators.js';
import { validateResourceId } from '../middleware/resourceIdValidator.js';
import { validateListQuery } from '../middleware/listQueryValidator.js';

const router = express.Router();

router.get('/', authenticate, validateListQuery(['id', 'projectId', 'assigneeId', 'creatorId', 'description', 'status']), getAllTasksHandler);
router.get('/:id', authenticate, validateResourceId, getTaskByIdHandler);
router.post('/', authenticate, validateCreateTask, createTaskHandler);
router.put('/:id', authenticate, validateResourceId, validateUpdateTask, updateTaskHandler);
router.delete('/:id', authenticate, validateResourceId, deleteTaskHandler);

export default router;