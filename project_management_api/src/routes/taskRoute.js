import express from 'express';
import { getAllTasksHandler, getTaskByIdHandler, createTaskHandler, updateTaskHandler, deleteTaskHandler } from '../controllers/taskController.js';

const router = express.Router();

router.get('/', getAllTasksHandler);
router.get('/:id', getTaskByIdHandler);
router.post('/', createTaskHandler);
router.put('/:id', updateTaskHandler);
router.delete('/:id', deleteTaskHandler);

export default router;