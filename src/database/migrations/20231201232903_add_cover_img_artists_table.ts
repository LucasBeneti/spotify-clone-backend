import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("artists", (table) => {
    table.text("page_cover_img");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("artists", (table) => {
    table.dropColumn("page_cover_img");
  });
}
