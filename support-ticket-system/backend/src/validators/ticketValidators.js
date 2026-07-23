import { body, param, query } from 'express-validator';
import { TICKET_PRIORITIES, TICKET_STATUSES } from '../constants/ticketConstants.js';

const objectId = (field) =>
  param(field).isMongoId().withMessage(`${field} must be a valid id`);

export const listTicketsValidator = [
  query('status').optional().isIn(TICKET_STATUSES).withMessage('Invalid status filter'),
  query('search').optional().isString().trim(),
  query('page').optional().isInt({ min: 1 }).withMessage('page must be >= 1'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('limit must be 1-100'),
];

export const ticketIdValidator = [objectId('id')];

export const createTicketValidator = [
  body('title').trim().isLength({ min: 3, max: 200 }).withMessage('Title must be 3-200 characters'),
  body('description')
    .trim()
    .isLength({ min: 10, max: 5000 })
    .withMessage('Description must be 10-5000 characters'),
  body('priority').isIn(TICKET_PRIORITIES).withMessage('Invalid priority'),
  body('createdBy').isMongoId().withMessage('createdBy must be a valid user id'),
  body('assignedTo').optional({ nullable: true }).isMongoId().withMessage('assignedTo must be valid'),
];

export const updateTicketValidator = [
  ...ticketIdValidator,
  body('title').trim().isLength({ min: 3, max: 200 }).withMessage('Title must be 3-200 characters'),
  body('description')
    .trim()
    .isLength({ min: 10, max: 5000 })
    .withMessage('Description must be 10-5000 characters'),
  body('priority').isIn(TICKET_PRIORITIES).withMessage('Invalid priority'),
  body('assignedTo').optional({ nullable: true }).isMongoId().withMessage('assignedTo must be valid'),
];

export const assignTicketValidator = [
  ...ticketIdValidator,
  body('assignedTo').isMongoId().withMessage('assignedTo must be a valid user id'),
];

export const changeStatusValidator = [
  ...ticketIdValidator,
  body('status').isIn(TICKET_STATUSES).withMessage('Invalid status'),
];

export const createCommentValidator = [
  ...ticketIdValidator,
  body('message').trim().isLength({ min: 1, max: 2000 }).withMessage('Message must be 1-2000 characters'),
  body('createdBy').isMongoId().withMessage('createdBy must be a valid user id'),
];

export const userIdValidator = [objectId('id')];
