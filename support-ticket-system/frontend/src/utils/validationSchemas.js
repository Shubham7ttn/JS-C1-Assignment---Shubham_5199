import * as Yup from 'yup';
import { TICKET_PRIORITIES } from '../constants/ticket';

export const ticketSchema = Yup.object({
  title: Yup.string().trim().min(3, 'Title must be at least 3 characters').max(200).required('Title is required'),
  description: Yup.string()
    .trim()
    .min(10, 'Description must be at least 10 characters')
    .max(5000)
    .required('Description is required'),
  priority: Yup.string().oneOf(TICKET_PRIORITIES.map((p) => p.value), 'Invalid priority').required(),
  createdBy: Yup.string().required('Creator is required'),
  assignedTo: Yup.string().nullable(),
});

export const commentSchema = Yup.object({
  message: Yup.string().trim().min(1, 'Comment cannot be empty').max(2000).required('Comment is required'),
  createdBy: Yup.string().required('Author is required'),
});
