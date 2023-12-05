import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("songs", (table) => {
    table.integer("duration").defaultTo(289);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("songs", (table) => {
    table.dropColumn("duration");
  });
}
