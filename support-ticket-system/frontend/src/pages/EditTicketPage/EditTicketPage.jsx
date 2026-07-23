import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetTicketByIdQuery, useGetUsersQuery, useUpdateTicketMutation } from '../../api/ticketsApi';
import { TICKET_PRIORITIES } from '../../constants/ticket';
import { ticketSchema } from '../../utils/validationSchemas';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import ErrorAlert from '../../components/ErrorMessage/ErrorMessage';
import styles from '../CreateTicketPage/CreateTicketPage.module.scss';

function EditTicketPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetTicketByIdQuery(id);
  const { data: usersData } = useGetUsersQuery();
  const [updateTicket, { isLoading: isSaving, error: saveError }] = useUpdateTicketMutation();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message="Failed to load ticket for editing." />;

  const ticket = data?.data;
  const users = usersData?.data || [];

  return (
    <div>
      <h1>Edit Ticket</h1>
      {saveError && <ErrorAlert message="Failed to update ticket." />}
      <Formik
        enableReinitialize
        initialValues={{
          title: ticket.title,
          description: ticket.description,
          priority: ticket.priority,
          createdBy: ticket.createdBy?._id || '',
          assignedTo: ticket.assignedTo?._id || '',
        }}
        validationSchema={ticketSchema}
        onSubmit={async (values) => {
          const result = await updateTicket({
            id,
            title: values.title,
            description: values.description,
            priority: values.priority,
            assignedTo: values.assignedTo || null,
          });

          if (!result.error) {
            navigate(`/tickets/${id}`);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className={styles.form}>
            <label>
              Title
              <Field name="title" />
              <ErrorMessage name="title" component="div" className={styles.fieldError} />
            </label>
            <label>
              Description
              <Field as="textarea" name="description" rows={5} />
              <ErrorMessage name="description" component="div" className={styles.fieldError} />
            </label>
            <label>
              Priority
              <Field as="select" name="priority">
                {TICKET_PRIORITIES.map((priority) => (
                  <option key={priority.value} value={priority.value}>
                    {priority.label}
                  </option>
                ))}
              </Field>
            </label>
            <label>
              Assign To
              <Field as="select" name="assignedTo">
                <option value="">Unassigned</option>
                {users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.name}
                  </option>
                ))}
              </Field>
            </label>
            <button type="submit" disabled={isSubmitting || isSaving}>
              Save Changes
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default EditTicketPage;
