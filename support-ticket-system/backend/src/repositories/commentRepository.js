import Comment from '../models/Comment.js';

const populateFields = { path: 'createdBy', select: 'name email role' };

export const commentRepository = {
  create: (data) => Comment.create(data),

  findByTicketId: (ticketId) =>
    Comment.find({ ticketId }).populate(populateFields).sort({ createdAt: 1 }).lean(),

  deleteByTicketId: (ticketId) => Comment.deleteMany({ ticketId }),
};
