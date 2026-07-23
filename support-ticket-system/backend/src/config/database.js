import mongoose from 'mongoose';
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
