import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("playlist_songs", (table) => {
    table.unique(["playlist_id", "song_id"], {
      indexName: "unique_song_playlist_pair_index",
      useConstraint: true,
    });
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("playlist_songs", (table) => {
    table.dropUnique(
      ["playlist_id", "song_id"],
      "unique_song_playlist_pair_index"
    );
  });
}
