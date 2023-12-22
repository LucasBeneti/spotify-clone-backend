import knex from "knex";

const database = knex({
  client: "pg",
  connection: `postgresql://postgres:${process.env.DB_PASSWORD}@db.hkxqnzjaporhzwnwmdwm.supabase.co:5432/postgres`,
  // connection: {
  //   host: process.env.DB_HOST,
  //   port: Number(process.env.DB_PORT),
  //   user: process.env.DB_USER,
  //   password: process.env.DB_PASSWORD,
  //   database: process.env.DB_NAME,
  // },
});

export default database;
