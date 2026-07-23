import styles from './LoadingSpinner.module.scss';

function LoadingSpinner({ label = 'Loading...' }) {
  return (
    <div className={styles.wrapper} role="status" aria-live="polite">
      <div className={styles.spinner} />
      <span>{label}</span>
    </div>
  );
}

export default LoadingSpinner;
