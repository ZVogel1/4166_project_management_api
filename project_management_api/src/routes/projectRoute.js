import express from 'express';
import { getAllProjectsHandler, getProjectByIdHandler, createProjectHandler, updateProjectHandler, deleteProjectHandler } from '../controllers/projectController.js';
import { authenticate } from '../middleware/authenticate.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';
import { validateProject } from '../middleware/projectValidators.js';

const router = express.Router();

router.get('/', authenticate, getAllProjectsHandler);
router.get('/:id', authenticate, getProjectByIdHandler);
router.post('/', authenticate, validateProject, createProjectHandler);
router.put('/:id', authenticate, validateProject, updateProjectHandler);
router.delete('/:id', authenticate, authorizeRoles('ADMIN'), deleteProjectHandler);

export default router;