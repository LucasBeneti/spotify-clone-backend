import knex from 'knex';

const DB = {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
};

const database = knex({
    client: 'pg',
    connection: {
        host: DB.host,
        port: DB.port,
        user: DB.user,
        password: DB.password,
        database: DB.database,
    },
});

export default database;
