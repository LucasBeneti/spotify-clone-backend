import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable('songs', (t) => {
        t.text('cover_art');
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable('songs', (t) => {
        t.dropColumn('cover_art');
    });
}
