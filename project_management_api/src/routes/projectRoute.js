import express from 'express';
import { getAllProjectsHandler, getProjectByIdHandler, createProjectHandler, updateProjectHandler, deleteProjectHandler } from '../controllers/projectController.js';
import { authenticate } from '../middleware/authenticate.js';
import { validateProject } from '../middleware/projectValidators.js';
import { validateResourceId } from '../middleware/resourceIdValidator.js';
import { validateListQuery } from '../middleware/listQueryValidator.js';

const router = express.Router();

router.get('/', authenticate, validateListQuery(['id', 'creatorId', 'name', 'description', 'createdAt']), getAllProjectsHandler);
router.get('/:id', authenticate, validateResourceId, getProjectByIdHandler);
router.post('/', authenticate, validateProject, createProjectHandler);
router.put('/:id', authenticate, validateResourceId, validateProject, updateProjectHandler);
router.delete('/:id', authenticate, validateResourceId, deleteProjectHandler);

export default router;