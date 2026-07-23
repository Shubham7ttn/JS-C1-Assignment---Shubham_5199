import styles from './StatusBadge.module.scss';

const LABELS = {
  open: 'Open',
  in_progress: 'In Progress',
  resolved: 'Resolved',
  closed: 'Closed',
  cancelled: 'Cancelled',
};

function StatusBadge({ status }) {
  return <span className={`${styles.badge} ${styles[status]}`}>{LABELS[status] || status}</span>;
}

export default StatusBadge;
