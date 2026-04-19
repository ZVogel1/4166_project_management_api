import { handleValidationErrors } from './handleValidationErrors.js';
import { body } from 'express-validator';

export const validateCreateTask = [
    body('projectId')
        .exists({ values: 'falsy' })
        .withMessage('Project ID is required')
        .bail()
        .isInt({ min: 1 })
        .withMessage('Project ID must be a positive integer')
        .toInt(),

    body('assigneeId')
        .exists({ values: 'falsy' })
        .withMessage('Assignee ID is required')
        .bail()
        .isInt({ min: 1 })
        .withMessage('Assignee ID must be a positive integer')
        .toInt(),

    body('description')
        .trim()
        .exists({ values: 'falsy' })
        .withMessage('Task description is required')
        .bail()
        .isLength({ min: 1, max: 1000 })
        .withMessage('Task description must be between 1 and 1000 characters'),

    body('status')
        .optional()
        .isIn(['todo', 'in_progress', 'done'])
        .withMessage('Task status must be one of: todo, in_progress, done'),

    handleValidationErrors,
];

export const validateUpdateTask = [
    body('assigneeId')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Assignee ID must be a positive integer')
        .toInt(),

    body('description')
        .optional()
        .trim()
        .isLength({ min: 1, max: 1000 })
        .withMessage('Task description must be between 1 and 1000 characters'),

    body('status')
        .optional()
        .isIn(['todo', 'in_progress', 'done'])
        .withMessage('Task status must be one of: todo, in_progress, done'),

    handleValidationErrors,
];