import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

const envExample = `NODE_ENV=development
PORT=5000

# Local MongoDB (default port 27017)
# Use 127.0.0.1 instead of localhost to avoid IPv6 issues on Windows
MONGODB_URI=mongodb://127.0.0.1:27017/support-tickets
`;

const envJs = `import dotenv from 'dotenv';

dotenv.config();

const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 5000,
  mongoUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/support-tickets',
};

export default env;
`;

const databaseJs = `import mongoose from 'mongoose';
import env from './env.js';

export const connectDatabase = async () => {
  try {
    await mongoose.connect(env.mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log('Connected to MongoDB at', env.mongoUri);
  } catch (error) {
    if (error.name === 'MongooseServerSelectionError') {
      throw new Error(
        'Cannot connect to local MongoDB at ' + env.mongoUri + '. ' +
          'Make sure MongoDB is installed and running (e.g. net start MongoDB on Windows).'
      );
    }
    throw error;
  }
};

export const disconnectDatabase = async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
};
`;

const localDoc = `# Local MongoDB Setup

## Windows

1. Download MongoDB Community Server: https://www.mongodb.com/try/download/community
2. Install with **Install MongoDB as a Service** enabled.
3. Start MongoDB:

\`\`\`powershell
net start MongoDB
\`\`\`

4. Configure \`backend/.env\`:

\`\`\`env
MONGODB_URI=mongodb://127.0.0.1:27017/support-tickets
\`\`\`

5. Seed and run:

\`\`\`powershell
cd backend
npm run seed
npm run dev
\`\`\`

## Verify MongoDB is running

\`\`\`powershell
mongosh mongodb://127.0.0.1:27017/support-tickets
\`\`\`

## Troubleshooting

- **ECONNREFUSED**: MongoDB service is not started. Run \`net start MongoDB\`.
- **IPv6 issues**: Use \`127.0.0.1\` instead of \`localhost\` in MONGODB_URI.
`;

const readme = `# Support Ticket Management System

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
2. Copy \`backend/.env.example\` to \`backend/.env\`.

\`\`\`bash
cd backend
copy .env.example .env
npm install
npm run seed
npm run dev
\`\`\`

### Frontend
\`\`\`bash
cd frontend
copy .env.example .env
npm install
npm run dev
\`\`\`

API: http://localhost:5000
UI: http://localhost:5173

## Tests
\`\`\`bash
cd backend && npm test
cd frontend && npm test
\`\`\`

## Features
Create, update, assign tickets; status workflow; comments; search; filter; dashboard summary.
`;

fs.writeFileSync(path.join(root, 'backend/.env.example'), envExample, 'utf8');
fs.writeFileSync(path.join(root, 'backend/.env'), envExample, 'utf8');
fs.writeFileSync(path.join(root, 'backend/src/config/env.js'), envJs, 'utf8');
fs.writeFileSync(path.join(root, 'backend/src/config/database.js'), databaseJs, 'utf8');
fs.mkdirSync(path.join(root, 'docs'), { recursive: true });
fs.writeFileSync(path.join(root, 'docs/mongodb-local-setup.md'), localDoc, 'utf8');
fs.writeFileSync(path.join(root, 'README.md'), readme, 'utf8');

const atlasDoc = path.join(root, 'docs/mongodb-atlas-setup.md');
if (fs.existsSync(atlasDoc)) fs.unlinkSync(atlasDoc);

console.log('Updated to local MongoDB configuration.');
