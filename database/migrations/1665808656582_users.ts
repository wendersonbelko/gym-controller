import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('photo').defaultTo('')
      table.string('name').notNullable()
      table.string('email').notNullable()
      table.string('cpf').notNullable()
      table.timestamp('birthday').notNullable()
      table.string('password').notNullable()
      table
        .enu('role', ['USER', 'TEACHER', 'GYM'], {
          useNative: true,
          enumName: 'user_account_roles',
          existingType: false,
        })
        .defaultTo('USER')
        .notNullable()
      table
        .enu('account_status', ['PENDING', 'ACTIVE', 'SUSPENDED', 'DELETED'], {
          useNative: true,
          enumName: 'user_account_status',
          existingType: false,
        })
        .defaultTo('PENDING')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
    this.schema.dropSchemaIfExists('user_account_status')
    this.schema.dropSchemaIfExists('user_account_roles')
  }
}
