import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("artists", (table) => {
    table.increments("id").primary();
    table.text("name").notNullable();
    // table.text("profile_image");
    // table.text("page_cover_img");

    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("artists");
}
