import mongoose from 'mongoose';
import { DB_NAME } from './Constants.js'; // Make sure this exists

let dbConnection = null;

export const connectToMongo = async () => {
  if (dbConnection) return dbConnection; // reuse existing connection

  try {
    const uri = `${process.env.MONGO_URI}/${DB_NAME}`; // or just process.env.MONGO_URI
    console.log('Connecting to MongoDB at:', uri);

    dbConnection = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ MongoDB connected successfully');
    return dbConnection;
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error);
    throw error;
  }
};
