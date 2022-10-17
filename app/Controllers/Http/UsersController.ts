import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { UserAccountStatus } from 'App/contracts/UserContract'
import BadRequest from 'App/Exceptions/BadRequestException'
import User from 'App/Models/User'
import CreateUserValidator from 'App/Validators/CreateUserValidator'
import Event from '@ioc:Adonis/Core/Event'
import Env from '@ioc:Adonis/Core/Env'

export default class UsersController {
  public async store({ request, response }: HttpContextContract) {
    const body = await request.validate(CreateUserValidator)

    const userExistByEmail = await User.findBy('email', body.email)
    if (userExistByEmail && userExistByEmail?.accountStatus !== UserAccountStatus.DELETED) {
      Event.emit('user:pending', {
        email: userExistByEmail.email,
        name: userExistByEmail.name,
        verifyUrl: `${Env.get('HOST_URL')}`,
      })

      throw new BadRequest('email already exist', 409)
    }

    const userExistByCpf = await User.findBy('cpf', body.cpf)
    if (userExistByCpf && userExistByCpf?.accountStatus !== UserAccountStatus.DELETED) {
      Event.emit('user:pending', {
        email: userExistByCpf.email,
        name: userExistByCpf.name,
        verifyUrl: `${Env.get('HOST_URL')}`,
      })

      throw new BadRequest('cpf already exist', 409)
    }

    Event.emit('user:pending', {
      email: body.email,
      name: body.name,
      verifyUrl: `${Env.get('HOST_URL')}`,
    })

    const user = await User.create(body)

    return response.created({ user })
  }
}
