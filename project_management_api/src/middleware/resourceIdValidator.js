import { param } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validateResourceId = [
  param('id')
    .exists({ values: 'falsy' })
    .withMessage('Resource ID is required')
    .bail()
    .isInt({ min: 1 })
    .withMessage('Resource ID must be a positive integer')
    .toInt(),

  handleValidationErrors,
];