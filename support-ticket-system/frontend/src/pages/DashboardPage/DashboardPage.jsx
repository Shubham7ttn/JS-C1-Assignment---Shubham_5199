import { useGetTicketsQuery } from '../../api/ticketsApi';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import styles from './DashboardPage.module.scss';

const STATUS_ORDER = ['open', 'in_progress', 'resolved', 'closed', 'cancelled'];

function DashboardPage() {
  const { data, isLoading, error } = useGetTicketsQuery({ limit: 100 });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message="Failed to load dashboard data." />;

  const tickets = data?.data || [];
  const counts = STATUS_ORDER.reduce((acc, status) => {
    acc[status] = tickets.filter((ticket) => ticket.status === status).length;
    return acc;
  }, {});

  return (
    <div>
      <h1>Dashboard</h1>
      <p className={styles.subtitle}>Overview of support ticket activity</p>
      <div className={styles.grid}>
        {STATUS_ORDER.map((status) => (
          <div key={status} className={styles.card}>
            <span className={styles.label}>{status.replace('_', ' ')}</span>
            <strong className={styles.count}>{counts[status]}</strong>
          </div>
        ))}
      </div>
      <p className={styles.total}>Total tickets: {tickets.length}</p>
    </div>
  );
}

export default DashboardPage;
