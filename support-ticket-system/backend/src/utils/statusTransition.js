import { STATUS_TRANSITIONS, TERMINAL_STATUSES } from '../constants/ticketConstants.js';

export const isValidStatusTransition = (currentStatus, nextStatus) => {
  if (!currentStatus || !nextStatus) {
    return false;
  }

  if (currentStatus === nextStatus) {
    return false;
  }

  if (TERMINAL_STATUSES.includes(currentStatus)) {
    return false;
  }

  const allowed = STATUS_TRANSITIONS[currentStatus] || [];
  return allowed.includes(nextStatus);
};

export const getAllowedTransitions = (currentStatus) => {
  if (TERMINAL_STATUSES.includes(currentStatus)) {
    return [];
  }

  return STATUS_TRANSITIONS[currentStatus] || [];
};
