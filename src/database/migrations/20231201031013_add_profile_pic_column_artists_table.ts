import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("artists", (table) => {
    table.text("profile_image");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("artists", (table) => {
    table.dropColumn("profile_image");
  });
}
