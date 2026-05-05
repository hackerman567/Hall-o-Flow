import { Db, MongoClient } from 'mongodb';

let mongoClient: MongoClient;
let db: Db;

export async function connectDatabase() {
  mongoClient = new MongoClient(process.env.MONGODB_URI || 'mongodb://localhost:27017');
  await mongoClient.connect();
  db = mongoClient.db('hall-o-flow');
  console.log('✅ Database connected');
  return db;
}

export function getDatabase() {
  return db;
}

export async function closeDatabaseConnection() {
  await mongoClient.close();
}
