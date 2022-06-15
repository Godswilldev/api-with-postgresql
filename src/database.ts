import { Pool } from "pg";
import { config } from "dotenv";

config();

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_HOST } =
  process.env;

const client = new Pool({
  user: POSTGRES_USER,
  host: POSTGRES_HOST,
  database: POSTGRES_DB,
  password: POSTGRES_PASSWORD,
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  ssl: false,
});

export default client;
