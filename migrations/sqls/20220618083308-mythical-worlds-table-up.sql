CREATE TABLE mythical_worlds (
  id SERIAL PRIMARY KEY,
  name varchar(100),
  type varchar(50),
  weight integer
);


INSERT INTO mythical_worlds (name, type, weight) VALUES ('Astrakhan', 'Earth', 1);