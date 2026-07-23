import { ticketService } from '../services/ticketService.js';
import { parsePagination } from '../utils/pagination.js';

export const listTickets = async (req, res) => {
  const pagination = parsePagination(req.query);
  const result = await ticketService.listTickets({
    status: req.query.status,
    search: req.query.search,
    pagination,
  });

  res.json({ success: true, ...result });
};

export const getTicket = async (req, res) => {
  const ticket = await ticketService.getTicketById(req.params.id);
  res.json({ success: true, data: ticket });
};

export const createTicket = async (req, res) => {
  const ticket = await ticketService.createTicket(req.body);
  res.status(201).json({ success: true, data: ticket });
};

export const updateTicket = async (req, res) => {
  const ticket = await ticketService.updateTicket(req.params.id, req.body);
  res.json({ success: true, data: ticket });
};

export const assignTicket = async (req, res) => {
  const ticket = await ticketService.assignTicket(req.params.id, req.body.assignedTo);
  res.json({ success: true, data: ticket });
};

export const changeStatus = async (req, res) => {
  const ticket = await ticketService.changeStatus(req.params.id, req.body.status);
  res.json({ success: true, data: ticket });
};

export const addComment = async (req, res) => {
  const comment = await ticketService.addComment(req.params.id, req.body);
  res.status(201).json({ success: true, data: comment });
};
