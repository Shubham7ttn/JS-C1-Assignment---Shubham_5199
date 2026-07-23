import styles from './SearchBar.module.scss';

function SearchBar({ value, onChange, placeholder = 'Search tickets...' }) {
  return (
    <input
      type="search"
      className={styles.input}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      aria-label="Search tickets"
    />
  );
}

export default SearchBar;
