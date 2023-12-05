import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("songs", (table) => {
    table.integer("times_played").defaultTo(0);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("songs", (table) => {
    table.dropColumn("times_played");
  });
}
