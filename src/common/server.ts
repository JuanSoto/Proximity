import * as express from 'express';
import { Application } from 'express';
import * as path from 'path';
import * as http from 'http';
import * as os from 'os';
import { middleware } from './middleware';
import * as Mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

const app = express();

const mongoServer = new MongoMemoryServer();

const DB_CONNECTION_DIR = `${process.env.DB_HOST}:${process.env.DB_PORT}/${
  process.env.DB_NAME
}`;
Mongoose.set('useCreateIndex', true);
Mongoose.set('useFindAndModify', false);
// Mongoose.connect(`mongodb://${DB_CONNECTION_DIR}`, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

Mongoose.Promise = Promise;
mongoServer.getUri().then(mongoUri => {
  const mongooseOpts = {
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000,
    useNewUrlParser: true,
  };

  Mongoose.connect(mongoUri, mongooseOpts);

  Mongoose.connection.on('error', e => {
    if (e.message.code === 'ETIMEDOUT') {
      console.log(e);
      Mongoose.connect(mongoUri, mongooseOpts);
    }
    console.log(e);
  });

  Mongoose.connection.once('open', () => {
    console.log(`MongoDB successfully connected to ${mongoUri}`);
  });
});

export default class ExpressServer {
  constructor() {
    const root = path.normalize(__dirname + '/../..');
    app.set('appPath', root + 'client');

    middleware.cors(app);
    middleware.bodyParser(app);
    middleware.cookieParser(app);
    middleware.sessionMiddleware(app);
    middleware.swagger(app);
    middleware.morgan(app);
  }

  router(routes: (app: Application) => void): ExpressServer {
    app.enable('case sensitive routing');
    app.enable('strict routing');
    app.disable('x-powered-by');
    routes(app);
    return this;
  }

  listen(port: number = parseInt(process.env.PORT, 10)): Application {
    const welcome = wport => {
      return () => {
        return console.log(
          `up and running in ${process.env.NODE_ENV ||
            'development'} @: ${os.hostname()} on port: ${wport}}`
        );
      };
    };
    http.createServer(app).listen(port, welcome(port));
    return app;
  }
}
