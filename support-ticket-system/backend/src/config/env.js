import dotenv from 'dotenv';

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
