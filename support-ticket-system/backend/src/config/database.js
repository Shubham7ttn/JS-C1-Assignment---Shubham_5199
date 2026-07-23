import mongoose from 'mongoose';
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
