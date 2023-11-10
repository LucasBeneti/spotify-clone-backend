import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("user_artist_following", (table) => {
    table.dropColumn("user_id");
    table
      .text("user_clerk_id")
      .references("users.clerk_user_id")
      .notNullable()
      .onDelete("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("user_artist_following", (table) => {
    table.dropColumn("user_clerk_id");
    table
      .integer("user_id")
      .references("users.id")
      .notNullable()
      .onDelete("CASCADE");
  });
}
