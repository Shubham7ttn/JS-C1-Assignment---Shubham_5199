import { Router } from 'express';
import { asyncHandler } from '../utils/appError.js';
import { validateRequest } from '../middleware/validateRequest.js';
import {
  addComment,
  assignTicket,
  changeStatus,
  createTicket,
  getTicket,
  listTickets,
  updateTicket,
} from '../controllers/ticketController.js';
import {
  assignTicketValidator,
  changeStatusValidator,
  createCommentValidator,
  createTicketValidator,
  listTicketsValidator,
  ticketIdValidator,
  updateTicketValidator,
} from '../validators/ticketValidators.js';

const router = Router();

router.get('/', listTicketsValidator, validateRequest, asyncHandler(listTickets));
router.get('/:id', ticketIdValidator, validateRequest, asyncHandler(getTicket));
router.post('/', createTicketValidator, validateRequest, asyncHandler(createTicket));
router.put('/:id', updateTicketValidator, validateRequest, asyncHandler(updateTicket));
router.patch('/:id/assign', assignTicketValidator, validateRequest, asyncHandler(assignTicket));
router.patch('/:id/status', changeStatusValidator, validateRequest, asyncHandler(changeStatus));
router.post('/:id/comments', createCommentValidator, validateRequest, asyncHandler(addComment));

export default router;
