import express from 'express';
import { getAllProjectsHandler, getProjectByIdHandler, createProjectHandler, updateProjectHandler, deleteProjectHandler } from '../controllers/projectController.js';
import { authenticate } from '../middleware/authenticate.js';
import { validateProject } from '../middleware/projectValidators.js';
import { validateResourceId } from '../middleware/resourceIdValidator.js';

const router = express.Router();

router.get('/', authenticate, getAllProjectsHandler);
router.get('/:id', authenticate, validateResourceId, getProjectByIdHandler);
router.post('/', authenticate, validateProject, createProjectHandler);
router.put('/:id', authenticate, validateResourceId, validateProject, updateProjectHandler);
router.delete('/:id', authenticate, validateResourceId, deleteProjectHandler);

export default router;