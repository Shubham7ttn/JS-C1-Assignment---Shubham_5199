# Support Ticket Management System

Production-quality Core build for internal support ticket tracking.

## Stack
- Frontend: React 19, Redux Toolkit, RTK Query, SCSS Modules, Formik, Yup
- Backend: Node.js, Express, Mongoose
- Database: MongoDB (local)

## Prerequisites
- Node.js 18+
- MongoDB Community Server installed and running locally

## Setup

### Backend (Local MongoDB)
1. Follow [docs/mongodb-local-setup.md](docs/mongodb-local-setup.md) to install and start MongoDB.
2. Copy `backend/.env.example` to `backend/.env`.

```bash
cd backend
copy .env.example .env
npm install
npm run seed
npm run dev
```

### Frontend
```bash
cd frontend
copy .env.example .env
npm install
npm run dev
```

API: http://localhost:5000
UI: http://localhost:5173

## Tests
```bash
cd backend && npm test
cd frontend && npm test
```

## Features
Create, update, assign tickets; status workflow; comments; search; filter; dashboard summary.
