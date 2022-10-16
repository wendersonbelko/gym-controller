import Factory from '@ioc:Adonis/Lucid/Factory'
import { UserAccountRole, UserAccountStatus } from 'App/contracts/UserContract'
import User from 'App/Models/User'
import { DateTime } from 'luxon'

export const userFactory = (status: UserAccountStatus, role: UserAccountRole) =>
  Factory.define(User, ({ faker }) => {
    return {
      name: faker.name.fullName(),
      email: faker.internet.email(),
      cpf: '88774116002',
      birthday: '2000-04-07T03:58:28.025Z' as unknown as DateTime,
      password: faker.internet.password(),
      photo: faker.internet.avatar(),
      accountStatus: status,
      role: role,
    }
  }).build()
