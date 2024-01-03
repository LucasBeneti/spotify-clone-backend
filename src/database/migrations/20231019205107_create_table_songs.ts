import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("songs", (table) => {
    table.increments("id").primary();
    table.text("name").notNullable();
    table.integer("album_id").references("albums.id").onDelete("CASCADE");
    table
      .integer("author_id")
      .references("artists.id")
      .notNullable()
      .onDelete("CASCADE");
    table.text("source_link").notNullable();
    table.integer("position_on_album").notNullable().defaultTo(1);
    table.integer("times_played").defaultTo(0);
    table.integer("duration").defaultTo(289);
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("songs");
}
