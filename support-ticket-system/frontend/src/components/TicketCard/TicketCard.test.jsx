import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TicketCard from './TicketCard';

const ticket = {
  _id: '1',
  title: 'Login issue',
  description: 'Cannot login to the application after password reset.',
  status: 'open',
  priority: 'high',
  assignedTo: { name: 'Bob Agent' },
  createdBy: { name: 'Carol User' },
};

describe('TicketCard', () => {
  test('renders ticket summary', () => {
    render(
      <MemoryRouter>
        <TicketCard ticket={ticket} />
      </MemoryRouter>
    );

    expect(screen.getByText('Login issue')).toBeInTheDocument();
    expect(screen.getByText('Open')).toBeInTheDocument();
    expect(screen.getByText('High')).toBeInTheDocument();
    expect(screen.getByText(/Assignee: Bob Agent/)).toBeInTheDocument();
  });
});
