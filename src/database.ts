import { Pool } from "pg";
import { config } from "dotenv";

config();

const {
  ENV,
  LOCAL_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_DEV_DB,
  POSTGRES_TEST_DB,
  POSTGRES_PASSWORD,
} = process.env;

const client = new Pool({
  host: LOCAL_HOST,
  user: POSTGRES_USER,
  port: Number(POSTGRES_PORT),
  password: POSTGRES_PASSWORD,
  database: ENV === "dev" ? POSTGRES_DEV_DB : POSTGRES_TEST_DB,
});

export default client;
