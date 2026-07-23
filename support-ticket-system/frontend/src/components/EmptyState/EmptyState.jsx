import styles from './EmptyState.module.scss';

function EmptyState({ title = 'No items found', description }) {
  return (
    <div className={styles.empty}>
      <h3>{title}</h3>
      {description && <p>{description}</p>}
    </div>
  );
}

export default EmptyState;
