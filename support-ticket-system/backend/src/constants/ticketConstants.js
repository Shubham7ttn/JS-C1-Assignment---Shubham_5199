export const USER_ROLES = ['admin', 'agent', 'user'];

export const TICKET_STATUSES = ['open', 'in_progress', 'resolved', 'closed', 'cancelled'];

export const TICKET_PRIORITIES = ['low', 'medium', 'high', 'critical'];

export const TERMINAL_STATUSES = ['closed', 'cancelled'];

export const STATUS_TRANSITIONS = {
  open: ['in_progress', 'cancelled'],
  in_progress: ['resolved', 'cancelled'],
  resolved: ['closed'],
  closed: [],
  cancelled: [],
};
