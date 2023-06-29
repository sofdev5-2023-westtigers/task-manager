import { MongoClient } from 'mongodb';
import { test } from 'vitest';
import dotenv from 'dotenv';
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
const client = new MongoClient(MONGODB_URI);

test('MongoDB Connection', async () => {
  try {
    console.log('Starting mongo...');
    await client.connect();
    console.log('MongoDB connection successful');
  } catch (error) {
    console.error(`MongoDB connection failed: ${error}`);
  } finally {
    console.log('Closing mongo...');
    await client.close();
  }
});
