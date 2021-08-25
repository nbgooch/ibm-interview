import morgan from 'morgan';
import express from 'express';
import indexRouter from './routes/index.router';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './graphql/schema';
import resolvers from './graphql/resolver';
import { getDatabaseConnection } from './lib/mongo.lib';
import logger from './lib/logger.lib';
import UserAPI from './graphql/datasource';

const app = express();

(async () => {
  try {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      dataSources: () => {
        return {
          user: new UserAPI(),
        };
      },
    });

    await server.start();
    server.applyMiddleware({ app });
    await getDatabaseConnection(process.env.DATABASE_NAME);
  } catch (err) {
    logger.error(`Failed to start the server: ${err}`);
    process.exit(1);
  }
})();

app.set('env', process.env.TARGET_ENV);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(':method :url :status :response-time ms - :res[content-length]'));
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  next();
});

app.use('/api/v1', indexRouter);


if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500).send({
      message: err.message || 'server error',
      status: err.status || 500,
      timestamp: Date.now().toString(),
      error: err,
    });
  });
}

app.use(function (err, req, res, next) {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500).send({
      message: err.message || 'server error',
      status: err.status || 500,
      timestamp: Date.now().toString(),
    });
  });
});

// Export express instance
export default app;
