import { Knex } from 'knex'

const tableName = 'tb_employees'

export async function up (knex: Knex): Promise<void> {
  return knex.schema.createTable(tableName, (table) => {
    table.increments('id').primary()
    table.string('name')
    table.string('phone')
    table.string('office')
    table.timestamp('update_at')
    table.integer('fk_id_user')
      .unsigned()
      .references('id')
      .inTable('tb_users')
    table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(knex.fn.now())
  })
}

export async function down (knex: Knex): Promise<void> {
  return knex.schema.dropTable(tableName)
}
