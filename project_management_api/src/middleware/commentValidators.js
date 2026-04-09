import { handleValidationErrors } from './handleValidationErrors.js';
import { body } from 'express-validator';

export const validateCreateComment = [
    body('taskId')
        .exists({ values: 'falsy' })
        .withMessage('Task ID is required')
        .bail()
        .isInt({ min: 1 })
        .withMessage('Task ID must be a positive integer'),

    body('content')
        .trim()
        .exists({ values: 'falsy' })
        .withMessage('Comment content is required')
        .bail()
        .isLength({ min: 1, max: 1000 })
        .withMessage('Comment content must be between 1 and 1000 characters'),

    handleValidationErrors,
];

export const validateUpdateComment = [
    body('content')
        .trim()
        .exists({ values: 'falsy' })
        .withMessage('Comment content is required')
        .bail()
        .isLength({ min: 1, max: 1000 })
        .withMessage('Comment content must be between 1 and 1000 characters'),

    handleValidationErrors,
];