import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("playlists", (table) => {
    table.increments("id").primary();
    table.text("name").notNullable();
    table
      .integer("author_id")
      .references("users.id") // probably should reference the clerk_user_id column
      .notNullable()
      .onDelete("CASCADE");
    table.boolean("is_liked_songs_playlist").defaultTo(false);
    table.text("description").defaultTo("");

    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("playlists");
}
