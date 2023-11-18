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

    table.timestamp("added_at").defaultTo(knex.fn.now());

    // This unique contraint here should be added on the table creation
    // since it would handle the conflict
    // table.unique(["playlist_id", "song_id"], {
    //   indexName: "unique_song_playlist_pair_index",
    //   useConstraint: true,
    // });
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("playlist_songs");
}
