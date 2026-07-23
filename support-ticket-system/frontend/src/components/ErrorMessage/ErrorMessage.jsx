import styles from './ErrorMessage.module.scss';

function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <div className={styles.error} role="alert">
      {message}
    </div>
  );
}

export default ErrorMessage;
