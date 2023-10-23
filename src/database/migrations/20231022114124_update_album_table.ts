import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("albums", (t) => {
    t.dropColumn("launch_date");
    t.integer("launch_year").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("albums", (t) => {
    t.dropColumn("launch_year");
    t.date("launch_date").notNullable();
  });
}
