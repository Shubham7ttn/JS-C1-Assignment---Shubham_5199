# Support Ticket Management System

Production-quality Core build for internal support ticket tracking.

## Stack
- Frontend: React 19, Redux Toolkit, RTK Query, SCSS Modules, Formik, Yup
- Backend: Node.js, Express, Mongoose
- Database: MongoDB

## Prerequisites
- Node.js 18+
- MongoDB Atlas account (free tier works)

## Setup

### Backend (MongoDB Atlas)
1. Follow [docs/mongodb-atlas-setup.md](docs/mongodb-atlas-setup.md) to create a cluster and connection string.
2. Set `MONGODB_URI` in `backend/.env`.

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
cp .env.example .env
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
