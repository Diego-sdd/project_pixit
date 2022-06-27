import { Knex } from 'knex'

const tableName = 'tb_users'

export async function up (knex: Knex): Promise<void> {
  return knex.schema.createTable(tableName, (table) => {
    table.increments('id').primary()
    table.string('name')
    table.string('email', 100).unique()
    table.string('password')
    table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(knex.fn.now())
  })
}

export async function down (knex: Knex): Promise<void> {
  return knex.schema.dropTable(tableName)
}
