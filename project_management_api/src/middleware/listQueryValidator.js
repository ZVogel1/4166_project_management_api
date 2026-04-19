import { query } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export function validateListQuery(allowedSortFields = ['id']) {
  return [
    query('search')
      .optional()
      .isString()
      .withMessage('Search must be a string')
      .trim(),

    query('sortBy')
      .optional()
      .isIn(allowedSortFields)
      .withMessage(`sortBy must be one of: ${allowedSortFields.join(', ')}`),

    query('order')
      .optional()
      .isIn(['asc', 'desc'])
      .withMessage('order must be one of: asc, desc'),

    query('offset')
      .optional()
      .isInt({ min: 0 })
      .withMessage('offset must be a non-negative integer')
      .toInt(),

    query('limit')
      .optional()
      .isInt({ min: 1, max: 100 })
      .withMessage('limit must be an integer between 1 and 100')
      .toInt(),

    handleValidationErrors,
  ];
}