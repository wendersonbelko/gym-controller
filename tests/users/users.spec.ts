import { test } from '@japa/runner'
import supertest from 'supertest'
import moment from 'moment'
import Database from '@ioc:Adonis/Lucid/Database'
import { userFactory } from 'Database/factories'
import { UserAccountRole, UserAccountStatus } from 'App/contracts/UserContract'

const BASE_URL = `http://${process.env.HOST}:3333`

test.group('users', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return await Database.rollbackGlobalTransaction()
  })

  test('it should create an user', async ({ assert }) => {
    const userPayload = {
      name: 'wenderson belko',
      email: 'wenderson@belko.com.br',
      cpf: '11111111111',
      birthday: moment().year(2000).month(3).date(7),
      password: '123456789',
    }
    const { body } = await supertest(BASE_URL).post('/user').send(userPayload).expect(201)

    assert.exists(body.token, 'token not found')
    assert.exists(body.user, 'user not found')
    assert.exists(body.user.name, 'name not found')
    assert.exists(body.user.email, 'email not found')
    assert.exists(body.user.cpf, 'cpf not found')
    assert.exists(body.user.birthday, 'birthday not found')
    assert.notExists(body.user.password, 'password found')
  })

  test('it should code 409 when email already exists', async ({ assert }) => {
    const userCreated = await userFactory(UserAccountStatus.PENDING, UserAccountRole.USER).create()
    const userPayload = {
      name: 'wenderson belko',
      email: userCreated.email,
      cpf: '11111111111',
      birthday: moment().year(2000).month(3).date(7),
      password: '123456789',
    }
    const { body } = await supertest(BASE_URL).post('/user').send(userPayload).expect(409)

    assert.equal(body.message, 'email already exist')
    assert.equal(body.code, 'BAD_REQUEST')
    assert.equal(body.status, 409)
  })

  test('it should code 409 when cpf already exists', async ({ assert }) => {
    const userCreated = await userFactory(UserAccountStatus.PENDING, UserAccountRole.USER).create()
    const userPayload = {
      name: 'wenderson belko',
      email: 'wenderson@belko.com.br',
      cpf: userCreated.cpf,
      birthday: moment().year(2000).month(3).date(7),
      password: '123456789',
    }
    const { body } = await supertest(BASE_URL).post('/user').send(userPayload).expect(409)

    assert.equal(body.message, 'email already exist')
    assert.equal(body.code, 'BAD_REQUEST')
    assert.equal(body.status, 409)
  })
})
