import mongoose from 'mongoose';
import logger from './logger.lib';

if (process.env.TARGET_ENV !== 'production') mongoose.set('debug', true);

async function getDatabaseConnection(db: string): Promise<void> {
  const _db = process.env.TARGET_ENV === 'production' ? db : `${db}-test`;

  logger.info({ message: `creating new db connection for: ${_db}` });

  try {
    const uri = process.env.MONGODB_CONNECTION_STRING || 'mongodb://localhost:27017',
      options = {
        dbName: _db,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
        connectTimeoutMS: 1000,
        autoCreate: true,
        autoIndex: false, // Don't build indexes
        poolSize: 10, // Maintain up to 10 socket connections
        serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
        socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      };

    await mongoose.connect(uri, options);
    return Promise.resolve(null);
  } catch (error) {
    logger.error(`failed to obtain db connection to: ${_db}`);
    logger.error(`${JSON.stringify(error)}`);
    process.exit(1);
  }
}

async function destroyDatabaseConnections(): Promise<void> {
  return await mongoose.disconnect();
}

export { getDatabaseConnection, destroyDatabaseConnections };
