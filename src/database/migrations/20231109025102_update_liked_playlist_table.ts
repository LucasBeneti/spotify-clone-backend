import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("liked_playlists_users", (table) => {
    table.dropColumn("users_id");
    table
      .integer("user_id")
      .references("users.id")
      .notNullable()
      .onDelete("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("liked_playlists_users", (table) => {
    table.dropColumn("user_id");
    table
      .integer("users_id")
      .references("users.id")
      .notNullable()
      .onDelete("CASCADE");
  });
}
