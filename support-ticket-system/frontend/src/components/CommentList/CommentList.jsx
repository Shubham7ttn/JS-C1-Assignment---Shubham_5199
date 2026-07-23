import styles from './CommentList.module.scss';

function CommentList({ comments = [] }) {
  if (!comments.length) {
    return <p className={styles.empty}>No comments yet.</p>;
  }

  return (
    <ul className={styles.list}>
      {comments.map((comment) => (
        <li key={comment._id} className={styles.item}>
          <div className={styles.meta}>
            <strong>{comment.createdBy?.name || 'Unknown'}</strong>
            <span>{new Date(comment.createdAt).toLocaleString()}</span>
          </div>
          <p>{comment.message}</p>
        </li>
      ))}
    </ul>
  );
}

export default CommentList;
