import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class SecurityToken extends BaseModel {
  @column({ isPrimary: true }) public id: number

  @column({ columnName: 'security_token' }) public securityToken: string

  @column({ columnName: 'user_id' }) public userId: number

  @belongsTo(() => User, {
    foreignKey: 'userId',
  })
  public user: BelongsTo<typeof User>

  @column.dateTime({ columnName: 'expires_at' })
  public expiresAt: DateTime

  @column.dateTime({ autoCreate: true }) public createdAt: DateTime
}
