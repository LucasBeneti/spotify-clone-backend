import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("playlists", (table) => {
    table.increments("id").primary();
    table.text("name").notNullable();
    table
      .integer("author_id")
      .references("users.id")
      .notNullable()
      .onDelete("CASCADE");

    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("playlists");
}
