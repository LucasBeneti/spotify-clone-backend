import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("playlists", (table) => {
    table.text("description").defaultTo("");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("playlists", (table) => {
    table.dropColumn("description");
  });
}
