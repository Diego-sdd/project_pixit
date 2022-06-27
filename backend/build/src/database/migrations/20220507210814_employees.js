"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const tableName = 'tb_employees';
async function up(knex) {
    return knex.schema.createTable(tableName, (table) => {
        table.increments('id').primary();
        table.string('name');
        table.string('phone');
        table.string('office');
        table.timestamp('update_at');
        table.integer('fk_id_user')
            .unsigned()
            .references('id')
            .inTable('tb_users');
        table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(knex.fn.now());
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable(tableName);
}
exports.down = down;
