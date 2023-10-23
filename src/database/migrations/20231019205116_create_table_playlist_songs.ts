import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("playlist_songs", (table) => {
    table
      .integer("playlist_id")
      .references("playlists.id")
      .notNullable()
      .onDelete("CASCADE");
    table
      .integer("song_id")
      .references("songs.id")
      .notNullable()
      .onDelete("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("playlist_songs");
}
