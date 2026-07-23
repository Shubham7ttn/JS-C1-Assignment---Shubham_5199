import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.scss';

const links = [
  { to: '/', label: 'Dashboard' },
  { to: '/tickets', label: 'Tickets' },
  { to: '/tickets/new', label: 'Create Ticket' },
];

function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <nav>
        <ul>
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) => (isActive ? styles.active : undefined)}
                end={link.to === '/'}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
