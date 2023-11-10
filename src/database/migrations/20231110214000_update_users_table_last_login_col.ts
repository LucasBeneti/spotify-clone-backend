import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("users", (table) => {
    table.text("clerk_user_id").unique();
    table.timestamp("last_login");
    table.dropColumn("following_artist");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("users", (table) => {
    table.dropColumn("last_login");
    table.dropColumn("clerk_user_id");
    table.integer("following_artist").references("artists.id");
  });
}
