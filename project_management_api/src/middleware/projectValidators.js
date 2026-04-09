import { handleValidationErrors } from './handleValidationErrors.js';
import { body } from 'express-validator';

export const validateProject = [
    body('name')
        .trim()
        .exists({ values: 'falsy' })
        .withMessage('Project name is required')
        .bail()
        .isLength({ min: 3, max: 100 })
        .withMessage('Project name must be between 3 and 100 characters'),

    body('description')
        .optional()
        .isLength({ max: 500 })
        .withMessage('Project description must be at most 500 characters'),

    

    handleValidationErrors,
]; 