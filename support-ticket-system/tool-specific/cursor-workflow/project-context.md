# Project Context - Support Ticket Management System

## Overview

Internal web application for creating, assigning, tracking, and resolving support tickets. Agents and staff manage ticket lifecycle from Open through Closed or Cancelled. All data persists in MongoDB.

## Tech Stack

- **Frontend:** React 19, React Router, Redux Toolkit, RTK Query, SCSS Modules, Formik, Yup, Axios
- **Backend:** Node.js, Express
- **Database:** MongoDB with Mongoose
- **Testing:** Jest, React Testing Library, Supertest

## Architecture

Clean architecture with strict layer separation:

**Backend:** routes -> controllers -> services -> repositories -> models

**Frontend:** pages -> components -> hooks -> redux/api -> types/constants

## Key Business Rules

1. Status transitions enforced on backend only:
   - Open -> In Progress | Cancelled
   - In Progress -> Resolved | Cancelled
   - Resolved -> Closed
   - Terminal states (Closed, Cancelled) allow no further transitions

2. All required fields validated on frontend (Yup) and backend (express-validator).

3. Tickets support keyword search (title, description) and status filter.

4. Comments belong to tickets; deleting a ticket cascades comment removal.

## Environment

- `MONGODB_URI` - MongoDB connection string
- `PORT` - API port (default 5000)
- `NODE_ENV` - development | test | production
- `VITE_API_BASE_URL` - frontend API base URL
