import styles from './PriorityBadge.module.scss';

const LABELS = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  critical: 'Critical',
};

function PriorityBadge({ priority }) {
  return (
    <span className={`${styles.badge} ${styles[priority]}`}>{LABELS[priority] || priority}</span>
  );
}

export default PriorityBadge;
