import knex from "knex";

const database = knex({
  client: "pg",
  connection: process.env.DB_CONNECTION_URL,
});

export default database;
