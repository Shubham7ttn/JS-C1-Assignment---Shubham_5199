import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

const envExample = `NODE_ENV=development
PORT=5000

# MongoDB Atlas (Cloud)
# 1. Create a free cluster at https://cloud.mongodb.com
# 2. Database Access: create a database user
# 3. Network Access: add your IP (or 0.0.0.0/0 for development only)
# 4. Connect -> Drivers -> copy connection string and replace placeholders below
MONGODB_URI=mongodb+srv://<db_username>:<db_password>@<cluster-host>.mongodb.net/support-tickets?retryWrites=true&w=majority&appName=support-tickets
`;

const envJs = `import dotenv from 'dotenv';

dotenv.config();

const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 5000,
  mongoUri: process.env.MONGODB_URI || '',
};

if (!env.mongoUri || env.mongoUri.includes('<')) {
  console.warn(
    'Warning: Set MONGODB_URI in backend/.env to your MongoDB Atlas connection string.'
  );
}

export default env;
`;

const databaseJs = `import mongoose from 'mongoose';
import env from './env.js';

export const connectDatabase = async () => {
  if (!env.mongoUri || env.mongoUri.includes('<')) {
    throw new Error(
      'MONGODB_URI is not configured. Add your MongoDB Atlas connection string to backend/.env'
    );
  }

  try {
    await mongoose.connect(env.mongoUri, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    if (error.name === 'MongooseServerSelectionError') {
      throw new Error(
        'Cannot connect to MongoDB Atlas. Check MONGODB_URI in backend/.env, ' +
          'your database user password, and Network Access IP whitelist in Atlas.'
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

const atlasDoc = `# MongoDB Atlas Setup

## 1. Create a cluster
1. Go to https://cloud.mongodb.com and sign in (or create an account).
2. Create a **free M0 cluster**.
3. Choose a cloud provider and region close to you.

## 2. Database user
1. Open **Database Access** -> **Add New Database User**.
2. Choose **Password** authentication.
3. Save the username and password (you need them for the connection string).

## 3. Network access
1. Open **Network Access** -> **Add IP Address**.
2. For local development, click **Add Current IP Address**.
3. Or use **Allow Access from Anywhere** (0.0.0.0/0) for development only.

## 4. Get connection string
1. Open **Database** -> **Connect** -> **Drivers**.
2. Copy the Node.js connection string. It looks like:
   mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
3. Replace \`<password>\` with your real password (URL-encode special characters).
4. Add the database name before the query string:
   mongodb+srv://user:pass@cluster0.xxxxx.mongodb.net/support-tickets?retryWrites=true&w=majority

## 5. Configure backend/.env
\`\`\`env
MONGODB_URI=mongodb+srv://YOUR_USER:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/support-tickets?retryWrites=true&w=majority
\`\`\`

## 6. Seed and run
\`\`\`powershell
cd backend
npm run seed
npm run dev
\`\`\`

## Password URL encoding
If your password contains special characters, encode them:
- @ -> %40
- # -> %23
- / -> %2F
`;

fs.writeFileSync(path.join(root, 'backend/.env.example'), envExample, 'utf8');
fs.writeFileSync(path.join(root, 'backend/src/config/env.js'), envJs, 'utf8');
fs.writeFileSync(path.join(root, 'backend/src/config/database.js'), databaseJs, 'utf8');
fs.mkdirSync(path.join(root, 'docs'), { recursive: true });
fs.writeFileSync(path.join(root, 'docs/mongodb-atlas-setup.md'), atlasDoc, 'utf8');

const readmePath = path.join(root, 'README.md');
let readme = fs.readFileSync(readmePath, 'utf8');
readme = readme.replace(
  'MongoDB running locally (or connection URI)',
  'MongoDB Atlas account (free tier works)'
);
readme = readme.replace(
  '### Backend\n```bash\ncd backend\ncp .env.example .env\nnpm install\nnpm run seed\nnpm run dev\n```',
  `### Backend (MongoDB Atlas)
1. Follow [docs/mongodb-atlas-setup.md](docs/mongodb-atlas-setup.md) to create a cluster and connection string.
2. Set \`MONGODB_URI\` in \`backend/.env\`.

\`\`\`bash
cd backend
copy .env.example .env
npm install
npm run seed
npm run dev
\`\`\``
);
fs.writeFileSync(readmePath, readme, 'utf8');

console.log('MongoDB Atlas configuration updated.');
