import * as dotenv from 'dotenv';

dotenv.config();

const {
  PORT,
  NODE_ENV,
  SALT,
  POSTGRES_DB,
  SECRET,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_HOST,
  PEPPER,
  POSTGRES_DB_TEST,
  POSTGRES_PASSWORD
} = process.env;

export default {
  port: parseInt(PORT as string),
  pg: {
    host: POSTGRES_HOST,
    port: parseInt(POSTGRES_PORT as string),
    database: NODE_ENV === 'test' ? POSTGRES_DB_TEST : POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD
  },
  jwt: {
    salt: parseInt(SALT as string),
    pepper: PEPPER as string,
    secret: SECRET as string
  }
};
