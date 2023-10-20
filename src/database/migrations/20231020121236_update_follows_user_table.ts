import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    // TODO figure out how to implement this altertable
    return knex.schema.alterTable('users', (t) => {
        t.dropColumn('following_artist');
        t.specificType('following_artists', 'INT[]').references('artists.id');
        t.specificType('following_users', 'INT[]').references('users.id');
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable('users', (t) => {
        t.dropColumn('following_artists');
        t.dropColumn('following_users');
        t.integer('following_artist').references('artists.id');
    });
}
