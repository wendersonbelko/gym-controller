import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { UserAccountRule, UserAccountStatus } from 'App/contracts/UserContract'

export default class User extends BaseModel {
  @column({ isPrimary: true }) public id: number

  @column() public photo: string

  @column() public name: string

  @column() public email: string

  @column() public cpf: string

  @column.date() public birthday: DateTime

  @column() public password: string

  @column() public rule: UserAccountRule

  @column({ columnName: 'account_status' }) public accountStatus: UserAccountStatus

  @column.dateTime({ autoCreate: true }) public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true }) public updatedAt: DateTime
}
