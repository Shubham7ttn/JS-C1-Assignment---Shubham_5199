# Data Model

## User
- name (string, required)
- email (string, unique, required)
- role (admin | agent | user)

## Ticket
- title, description, priority, status
- assignedTo (User ref, optional)
- createdBy (User ref, required)
- createdAt, updatedAt

## Comment
- ticketId (Ticket ref)
- message
- createdBy (User ref)
- createdAt

## Indexes
users.email; tickets.status, assignedTo, createdAt, text(title,description); comments.ticketId
