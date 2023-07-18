import 'dotenv/config';

import express from 'express';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import redis from 'redis';
import RateLimit from 'express-rate-limit';
import RateLimitRedis from 'rate-limit-redis';
import Youch from 'youch';
import * as Sentry from '@sentry/node';
import 'express-async-errors';

import routes from './routes';
import sentryConfig from './config/sentry';

import './database';

const app = express();
Sentry.init(sentryConfig);
app.use(Sentry.Handlers.requestHandler());
app.use(helmet());
app.use(cors({
  origin: process.env.FRONT_URL,
}));

app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'temp', 'uploads')));

if (process.env.NODE_ENV !== 'development') {
  app.use(new RateLimit({
    store: new RateLimitRedis({
      client: redis.createClient({
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
      }),
    }),
    windowMs: 1000 * 60 * 15,
    max: 100,
  }));
}

app.use(routes);
app.use(Sentry.Handlers.errorHandler());

app.use(async (err, req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    const errors = await new Youch(err, req).toJSON();

    return res.status(500).json(errors);
  }

  return res.status(500).json({ error: 'Internal server error' });
});

export default app;
