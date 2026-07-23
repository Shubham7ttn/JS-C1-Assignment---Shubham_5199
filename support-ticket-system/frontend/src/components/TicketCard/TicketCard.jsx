import { Link } from 'react-router-dom';
import StatusBadge from '../StatusBadge/StatusBadge';
import PriorityBadge from '../PriorityBadge/PriorityBadge';
import styles from './TicketCard.module.scss';

function TicketCard({ ticket }) {
  return (
    <Link to={`/tickets/${ticket._id}`} className={styles.card}>
      <div className={styles.header}>
        <h3>{ticket.title}</h3>
        <div className={styles.badges}>
          <StatusBadge status={ticket.status} />
          <PriorityBadge priority={ticket.priority} />
        </div>
      </div>
      <p className={styles.description}>{ticket.description}</p>
      <div className={styles.meta}>
        <span>Assignee: {ticket.assignedTo?.name || 'Unassigned'}</span>
        <span>Created by: {ticket.createdBy?.name || 'Unknown'}</span>
      </div>
    </Link>
  );
}

export default TicketCard;
