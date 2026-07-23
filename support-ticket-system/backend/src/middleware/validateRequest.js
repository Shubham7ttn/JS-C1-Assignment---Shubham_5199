import { validationResult } from 'express-validator';
import { AppError } from '../utils/appError.js';

export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const formatted = errors.array().map((error) => ({
      field: error.path,
      message: error.msg,
    }));

    return next(new AppError('Validation failed', 400, formatted));
  }

  return next();
};
