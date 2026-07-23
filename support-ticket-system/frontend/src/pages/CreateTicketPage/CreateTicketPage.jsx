import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useCreateTicketMutation, useGetUsersQuery } from '../../api/ticketsApi';
import { TICKET_PRIORITIES } from '../../constants/ticket';
import { ticketSchema } from '../../utils/validationSchemas';
import ErrorAlert from '../../components/ErrorMessage/ErrorMessage';
import styles from './CreateTicketPage.module.scss';

function CreateTicketPage() {
  const navigate = useNavigate();
  const [createTicket, { isLoading, error }] = useCreateTicketMutation();
  const { data: usersData } = useGetUsersQuery();
  const users = usersData?.data || [];

  const initialValues = {
    title: '',
    description: '',
    priority: 'medium',
    createdBy: users[0]?._id || '',
    assignedTo: '',
  };

  return (
    <div>
      <h1>Create Ticket</h1>
      {error && <ErrorAlert message="Failed to create ticket. Check your input and try again." />}
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={ticketSchema}
        onSubmit={async (values, { setSubmitting }) => {
          const payload = {
            ...values,
            assignedTo: values.assignedTo || undefined,
          };
          const result = await createTicket(payload);
          if (!result.error) {
            navigate(`/tickets/${result.data.data._id}`);
          }
          setSubmitting(false);
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
              Created By
              <Field as="select" name="createdBy">
                {users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="createdBy" component="div" className={styles.fieldError} />
            </label>
            <label>
              Assign To (optional)
              <Field as="select" name="assignedTo">
                <option value="">Unassigned</option>
                {users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.name}
                  </option>
                ))}
              </Field>
            </label>
            <button type="submit" disabled={isSubmitting || isLoading}>
              Create Ticket
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default CreateTicketPage;
