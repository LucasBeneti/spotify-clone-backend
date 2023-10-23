import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("songs", (t) => {
    t.text("source_link").notNullable();
    t.integer("position_on_album").notNullable().defaultTo(1);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("songs", (t) => {
    t.dropColumn("source_link");
    t.dropColumn("position_on_album");
  });
}
