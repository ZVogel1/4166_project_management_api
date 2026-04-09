import express from 'express';
import { getAllUsersHandler, getUserByIdHandler, createUserHandler, updateUserHandler, deleteUserHandler } from '../controllers/userController.js';
import { authenticate } from '../middleware/authenticate.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';

const router = express.Router();

router.get('/', authenticate, authorizeRoles("ADMIN"), getAllUsersHandler);
router.get('/:id', authenticate, getUserByIdHandler);
router.post('/', authenticate, authorizeRoles('ADMIN'), createUserHandler);
router.put('/:id', authenticate, updateUserHandler);
router.delete('/:id', authenticate, authorizeRoles('ADMIN'), deleteUserHandler);

export default router;