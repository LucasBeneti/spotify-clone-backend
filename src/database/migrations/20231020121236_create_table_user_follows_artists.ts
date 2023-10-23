import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("user_artist_following", (t) => {
    t.integer("user_id")
      .references("users.id")
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
