# API Contract

Base path: /api

## Tickets
- GET /tickets?status&search&page&limit
- GET /tickets/:id
- POST /tickets
- PUT /tickets/:id
- PATCH /tickets/:id/assign
- PATCH /tickets/:id/status
- POST /tickets/:id/comments

## Users
- GET /users
- GET /users/:id

## Health
- GET /health

## Success Response
{ success: true, data: ... }

## Error Response
{ success: false, message: string, errors: [{ field, message }] }
