import mongoose from 'mongoose';
import { TICKET_PRIORITIES, TICKET_STATUSES } from '../constants/ticketConstants.js';

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 200,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 5000,
    },
    priority: {
      type: String,
      enum: TICKET_PRIORITIES,
      required: true,
      default: 'medium',
    },
    status: {
      type: String,
      enum: TICKET_STATUSES,
      required: true,
      default: 'open',
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

ticketSchema.index({ status: 1 });
ticketSchema.index({ assignedTo: 1 });
ticketSchema.index({ createdAt: -1 });
ticketSchema.index({ title: 'text', description: 'text' });

const Ticket = mongoose.model('Ticket', ticketSchema);

export default Ticket;
