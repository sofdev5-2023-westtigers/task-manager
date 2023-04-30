import { MongoClient } from 'mongodb'
import dotenv from 'dotenv';
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI
const client = new MongoClient(MONGODB_URI)

export function start_mongo() {
	console.log('Starting mongo...');
	return client.connect();
}

export default client.db('test')