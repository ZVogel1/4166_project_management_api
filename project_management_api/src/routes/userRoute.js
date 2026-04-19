import express from 'express';
import { getAllUsersHandler, getUserByIdHandler, createUserHandler, updateUserHandler, deleteUserHandler } from '../controllers/userController.js';
import { authenticate } from '../middleware/authenticate.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';
import { validateResourceId } from '../middleware/resourceIdValidator.js';
import { validateListQuery } from '../middleware/listQueryValidator.js';

const router = express.Router();

router.get('/', authenticate, authorizeRoles('ADMIN'), validateListQuery(['id', 'email', 'role']), getAllUsersHandler);
router.get('/:id', authenticate, validateResourceId, getUserByIdHandler);
router.post('/', authenticate, authorizeRoles('ADMIN'), createUserHandler);
router.put('/:id', authenticate, validateResourceId, updateUserHandler);
router.delete('/:id', authenticate, authorizeRoles('ADMIN'), validateResourceId, deleteUserHandler);

export default router;