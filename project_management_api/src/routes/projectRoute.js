import express from 'express';
import { getAllProjectsHandler, getProjectByIdHandler, createProjectHandler, updateProjectHandler, deleteProjectHandler } from '../controllers/projectController.js';

const router = express.Router();

router.get('/', getAllProjectsHandler);
router.get('/:id', getProjectByIdHandler);
router.post('/', createProjectHandler);
router.put('/:id', updateProjectHandler);
router.delete('/:id', deleteProjectHandler);

export default router;