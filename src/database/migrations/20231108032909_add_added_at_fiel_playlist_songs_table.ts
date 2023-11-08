import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("playlist_songs", (table) => {
    table.timestamp("added_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("playlist_songs", (table) => {
    table.dropColumn("added_at");
  });
}
