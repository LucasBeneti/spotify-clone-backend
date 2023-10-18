import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.text('username').unique().notNullable();
        // TODO descobrir como fazer a relacao one-to-many aqui no knex
    });
}

export async function down(knex: Knex): Promise<void> {}
