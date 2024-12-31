import { MongoClient } from 'mongodb';
import * as mongoDB from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || '';
const DB_NAME = 'krasnoebedstvie';

let cachedDb: null | mongoDB.Db = null;

export async function mongodb() {
  if (cachedDb) {
    return cachedDb;
  }

  const client: mongoDB.MongoClient = await MongoClient.connect(MONGODB_URI);

  const db: mongoDB.Db = await client.db(DB_NAME);

  cachedDb = db;

  return db;
}

export default mongodb;
