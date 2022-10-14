import compression from 'compression';
import config from './config';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import routes from './routes';

// Create express app
const app = express();

// middleware
// logger
app.use(morgan('common'));

// disable x-powered-by in browser & other security issues
app.use(helmet());

// CORS
app.use(cors());

// compression
app.use(compression());

// body parser
app.use(express.json());

// use application routes
app.use(routes);

// start app
app.listen(config.port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started listening at http://localhost:${config.port}`);
});

export default app;
