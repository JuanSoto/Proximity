import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as session from 'express-session';
import * as morgan from 'morgan';
import * as swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './swagger.json';

const memoryStore = new session.MemoryStore();

export const middleware = {
  cors: app => {
    const corsOptions = {
      origin: process.env.STALKER_DOMAIN,
      credentials: true,
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    };
    app.use(cors(corsOptions));
  },

  bodyParser: app => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
  },

  cookieParser: app => {
    app.use(cookieParser(process.env.SESSION_SECRET));
  },

  sessionMiddleware: app => {
    const sessionMiddleware = session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      store: memoryStore,
    });

    app.use(sessionMiddleware);

    // Check whether session is connected and working.
    app.use(function(req, res, next) {
      if (!req.session) {
        return next(new Error('Session store connection not established'));
      }
      next();
    });
  },

  swagger: app => {
    app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  },

  morgan: app => {
    morgan.token('username', req => {
      // Replace username here
      return '[unauthenticated]';
    });

    app.use(
      morgan(
        ':remote-addr :remote-user :username :method :url HTTP/:http-version :status :res[content-length] - :response-time ms',
        { stream: null }
      )
    );
  },
};
