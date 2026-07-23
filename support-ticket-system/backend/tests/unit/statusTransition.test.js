import { isValidStatusTransition, getAllowedTransitions } from '../../src/utils/statusTransition.js';

describe('statusTransition utility', () => {
  test('allows open to in_progress', () => {
    expect(isValidStatusTransition('open', 'in_progress')).toBe(true);
  });

  test('allows open to cancelled', () => {
    expect(isValidStatusTransition('open', 'cancelled')).toBe(true);
  });

  test('rejects open to resolved', () => {
    expect(isValidStatusTransition('open', 'resolved')).toBe(false);
  });

  test('allows in_progress to resolved', () => {
    expect(isValidStatusTransition('in_progress', 'resolved')).toBe(true);
  });

  test('allows resolved to closed', () => {
    expect(isValidStatusTransition('resolved', 'closed')).toBe(true);
  });

  test('rejects transitions from closed', () => {
    expect(isValidStatusTransition('closed', 'open')).toBe(false);
    expect(getAllowedTransitions('closed')).toEqual([]);
  });

  test('rejects same status transition', () => {
    expect(isValidStatusTransition('open', 'open')).toBe(false);
  });
});
