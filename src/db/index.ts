import { Pool } from 'pg';
import config from '../config';

const {
  pg: { host, port, user, database, password }
} = config;

export default new Pool({
  host,
  port,
  user,
  database,
  password
});
