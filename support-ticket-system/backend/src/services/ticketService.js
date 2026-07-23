import { ticketRepository } from '../repositories/ticketRepository.js';
import { commentRepository } from '../repositories/commentRepository.js';
import { userRepository } from '../repositories/userRepository.js';
import { AppError } from '../utils/appError.js';
import { buildPagination } from '../utils/pagination.js';
import {
  getAllowedTransitions,
  isValidStatusTransition,
} from '../utils/statusTransition.js';

const ensureTicketExists = async (id) => {
  const ticket = await ticketRepository.findById(id);

  if (!ticket) {
    throw new AppError('Ticket not found', 404);
  }

  return ticket;
};

const ensureUserExists = async (id) => {
  const user = await userRepository.findById(id);

  if (!user) {
    throw new AppError('User not found', 404);
  }

  return user;
};

export const ticketService = {
  listTickets: async (query) => {
    const { page, limit, skip } = query.pagination;
    const { data, total } = await ticketRepository.findAll({
      status: query.status,
      search: query.search,
      skip,
      limit,
    });

    return {
      data,
      pagination: buildPagination({ page, limit, total }),
    };
  },

  getTicketById: async (id) => {
    const ticket = await ensureTicketExists(id);
    const comments = await commentRepository.findByTicketId(id);

    return { ...ticket, comments };
  },

  createTicket: async (payload) => {
    await ensureUserExists(payload.createdBy);

    if (payload.assignedTo) {
      await ensureUserExists(payload.assignedTo);
    }

    const created = await ticketRepository.create({
      title: payload.title,
      description: payload.description,
      priority: payload.priority,
      createdBy: payload.createdBy,
      assignedTo: payload.assignedTo || null,
      status: 'open',
    });

    return ticketRepository.findById(created._id);
  },

  updateTicket: async (id, payload) => {
    await ensureTicketExists(id);

    if (payload.assignedTo) {
      await ensureUserExists(payload.assignedTo);
    }

    const updated = await ticketRepository.updateById(id, {
      title: payload.title,
      description: payload.description,
      priority: payload.priority,
      ...(payload.assignedTo !== undefined ? { assignedTo: payload.assignedTo } : {}),
    });

    return updated;
  },

  assignTicket: async (id, assignedTo) => {
    await ensureTicketExists(id);
    await ensureUserExists(assignedTo);

    return ticketRepository.updateById(id, { assignedTo });
  },

  changeStatus: async (id, status) => {
    const ticket = await ensureTicketExists(id);

    if (!isValidStatusTransition(ticket.status, status)) {
      const allowed = getAllowedTransitions(ticket.status);
      throw new AppError(
        `Invalid status transition from '${ticket.status}' to '${status}'. Allowed: ${allowed.join(', ') || 'none'}`,
        400,
        [{ field: 'status', message: 'Invalid status transition' }]
      );
    }

    return ticketRepository.updateById(id, { status });
  },

  addComment: async (ticketId, payload) => {
    await ensureTicketExists(ticketId);
    await ensureUserExists(payload.createdBy);

    await commentRepository.create({
      ticketId,
      message: payload.message,
      createdBy: payload.createdBy,
    });

    const comments = await commentRepository.findByTicketId(ticketId);
    return comments[comments.length - 1];
  },
};

export const userService = {
  listUsers: () => userRepository.findAll(),

  getUserById: async (id) => {
    const user = await userRepository.findById(id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return user;
  },
};
