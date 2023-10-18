import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('artists', (table) => {
        table.increments('id').primary();
        table.text('name').notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('artists');
}
