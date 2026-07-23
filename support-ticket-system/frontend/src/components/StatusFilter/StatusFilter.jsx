import { TICKET_STATUSES } from '../../constants/ticket';
import styles from './StatusFilter.module.scss';

function StatusFilter({ value, onChange }) {
  return (
    <select
      className={styles.select}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      aria-label="Filter by status"
    >
      <option value="">All statuses</option>
      {TICKET_STATUSES.map((status) => (
        <option key={status.value} value={status.value}>
          {status.label}
        </option>
      ))}
    </select>
  );
}

export default StatusFilter;
