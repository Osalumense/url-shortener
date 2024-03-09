const { table } = require("console");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable("Url", (table) => {
            table.increments('id').primary();
            table.string("short_id").notNullable();
            table.string("original_url").notNullable();
            table.timestamps(true, true);
        })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("Url")
};
