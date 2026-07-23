import { useState } from 'react';
import { useGetTicketsQuery } from '../../api/ticketsApi';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';
import SearchBar from '../../components/SearchBar/SearchBar';
import StatusFilter from '../../components/StatusFilter/StatusFilter';
import TicketCard from '../../components/TicketCard/TicketCard';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import EmptyState from '../../components/EmptyState/EmptyState';
import styles from './TicketListPage.module.scss';

function TicketListPage() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const debouncedSearch = useDebouncedValue(search);

  const { data, isLoading, error } = useGetTicketsQuery({
    search: debouncedSearch || undefined,
    status: status || undefined,
  });

  return (
    <div>
      <h1>Tickets</h1>
      <div className={styles.filters}>
        <SearchBar value={search} onChange={setSearch} />
        <StatusFilter value={status} onChange={setStatus} />
      </div>

      {isLoading && <LoadingSpinner />}
      {error && <ErrorMessage message="Failed to load tickets." />}

      {!isLoading && !error && (
        <div className={styles.list}>
          {data?.data?.length ? (
            data.data.map((ticket) => <TicketCard key={ticket._id} ticket={ticket} />)
          ) : (
            <EmptyState title="No tickets found" description="Try adjusting your search or filters." />
          )}
        </div>
      )}
    </div>
  );
}

export default TicketListPage;
