CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  firstname VARCHAR(50),
  lastname VARCHAR(50),
  email VARCHAR(50),
  password VARCHAR(250)
);