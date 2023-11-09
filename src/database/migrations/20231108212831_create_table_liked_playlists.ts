import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("liked_playlists_users", (table) => {
    table
      .integer("playlist_id")
      .references("playlists.id")
      .notNullable()
      .onDelete("CASCADE");
    table
      .integer("users_id")
      .references("users.id")
      .notNullable()
      .onDelete("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("playlist_id");
}
