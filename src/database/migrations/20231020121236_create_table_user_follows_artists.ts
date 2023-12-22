import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("user_artist_following", (t) => {
    t.text("user_clerk_id")
      .references("users.clerk_user_id")
      .notNullable()
      .onDelete("CASCADE");
    t.integer("artist_id")
      .references("artists.id")
      .notNullable()
      .onDelete("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("user_artist_following");
}
