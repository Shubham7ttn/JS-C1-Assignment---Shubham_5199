import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link, useParams } from 'react-router-dom';
import {
  useAddCommentMutation,
  useAssignTicketMutation,
  useChangeStatusMutation,
  useGetTicketByIdQuery,
  useGetUsersQuery,
} from '../../api/ticketsApi';
import { STATUS_TRANSITIONS_UI } from '../../constants/ticket';
import { commentSchema } from '../../utils/validationSchemas';
import StatusBadge from '../../components/StatusBadge/StatusBadge';
import PriorityBadge from '../../components/PriorityBadge/PriorityBadge';
import CommentList from '../../components/CommentList/CommentList';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import ErrorAlert from '../../components/ErrorMessage/ErrorMessage';
import styles from './TicketDetailsPage.module.scss';

function TicketDetailsPage() {
  const { id } = useParams();
  const { data, isLoading, error } = useGetTicketByIdQuery(id);
  const { data: usersData } = useGetUsersQuery();
  const [changeStatus, { error: statusError }] = useChangeStatusMutation();
  const [assignTicket, { error: assignError }] = useAssignTicketMutation();
  const [addComment, { error: commentError }] = useAddCommentMutation();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message="Ticket not found or failed to load." />;

  const ticket = data?.data;
  const users = usersData?.data || [];
  const allowedStatuses = STATUS_TRANSITIONS_UI[ticket.status] || [];

  return (
    <div>
      <div className={styles.header}>
        <div>
          <h1>{ticket.title}</h1>
          <div className={styles.badges}>
            <StatusBadge status={ticket.status} />
            <PriorityBadge priority={ticket.priority} />
          </div>
        </div>
        <Link to={`/tickets/${id}/edit`} className={styles.editLink}>
          Edit
        </Link>
      </div>

      <p className={styles.description}>{ticket.description}</p>
      <div className={styles.meta}>
        <span>Assignee: {ticket.assignedTo?.name || 'Unassigned'}</span>
        <span>Created by: {ticket.createdBy?.name}</span>
        <span>Updated: {new Date(ticket.updatedAt).toLocaleString()}</span>
      </div>

      <section className={styles.section}>
        <h2>Assign Ticket</h2>
        {assignError && <ErrorAlert message="Failed to assign ticket." />}
        <select
          value={ticket.assignedTo?._id || ''}
          onChange={(event) => {
            const value = event.target.value;
            if (value) {
              assignTicket({ id, assignedTo: value });
            }
          }}
        >
          <option value="">Unassigned</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
        </select>
      </section>

      <section className={styles.section}>
        <h2>Change Status</h2>
        {statusError && <ErrorAlert message="Invalid status transition. The server rejected this change." />}
        {allowedStatuses.length ? (
          <div className={styles.statusActions}>
            {allowedStatuses.map((status) => (
              <button key={status} type="button" onClick={() => changeStatus({ id, status })}>
                Mark as {status.replace('_', ' ')}
              </button>
            ))}
          </div>
        ) : (
          <p className={styles.muted}>No further status changes allowed.</p>
        )}
      </section>

      <section className={styles.section}>
        <h2>Comments</h2>
        <CommentList comments={ticket.comments} />
        {commentError && <ErrorAlert message="Failed to add comment." />}
        <Formik
          initialValues={{ message: '', createdBy: users[0]?._id || '' }}
          enableReinitialize
          validationSchema={commentSchema}
          onSubmit={async (values, { resetForm }) => {
            await addComment({ id, ...values });
            resetForm();
          }}
        >
          {({ isSubmitting }) => (
            <Form className={styles.commentForm}>
              <Field as="textarea" name="message" rows={3} placeholder="Add a comment..." />
              <ErrorMessage name="message" component="div" className={styles.fieldError} />
              <Field as="select" name="createdBy">
                {users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.name}
                  </option>
                ))}
              </Field>
              <button type="submit" disabled={isSubmitting}>
                Add Comment
              </button>
            </Form>
          )}
        </Formik>
      </section>
    </div>
  );
}

export default TicketDetailsPage;
