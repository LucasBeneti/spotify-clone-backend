import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("albums", (table) => {
    table.increments("id").primary();
    table.text("name").notNullable();
    table
      .integer("author_id")
      .references("artists.id")
      .notNullable()
      .onDelete("CASCADE");

    table.date("launch_date").notNullable();
    table.text("cover_art");

    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("albums");
}
