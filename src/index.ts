import _ from 'lodash';
import app from './app';
import logger from './lib/logger.lib';
import { destroyDatabaseConnections } from './lib/mongo.lib';

// Start the server
const env = process.env.TARGET_ENV || 'development',
  port = Number(process.env.PORT || 4000);

app.set('port', port);
app.set('env', env);
app.listen(port, () => {
  logger.info(`🚀  ${env} server is running!`);
  logger.info(`🔉  Listening on port ${port}`);
});

process.on('SIGINT', async function () {
  try {
    await destroyDatabaseConnections();
  } finally {
    logger.info(`💣  ${env} server is terminating!`);
    logger.info(`💀  Killing server on port ${port}`);
    process.exit(1);
  }
});
