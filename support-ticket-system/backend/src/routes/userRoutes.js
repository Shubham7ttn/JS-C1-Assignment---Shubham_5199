import { Router } from 'express';
import { asyncHandler } from '../utils/appError.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { listUsers, getUser } from '../controllers/userController.js';
import { userIdValidator } from '../validators/ticketValidators.js';

const router = Router();

router.get('/', asyncHandler(listUsers));
router.get('/:id', userIdValidator, validateRequest, asyncHandler(getUser));

export default router;
