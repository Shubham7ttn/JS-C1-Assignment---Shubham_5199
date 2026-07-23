import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

function Header() {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        Support Tickets
      </Link>
      <Link to="/tickets/new" className={styles.createButton}>
        Create Ticket
      </Link>
    </header>
  );
}

export default Header;
