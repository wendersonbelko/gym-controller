import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { UserAccountStatus } from 'App/contracts/UserContract'
import BadRequest from 'App/Exceptions/BadRequestException'
import User from 'App/Models/User'
import CreateUserValidator from 'App/Validators/CreateUserValidator'

export default class UsersController {
  public async store({ request, response }: HttpContextContract) {
    const body = await request.validate(CreateUserValidator)

    const userExistByEmail = await User.findBy('email', body.email)
    if (userExistByEmail && userExistByEmail?.accountStatus !== UserAccountStatus.DELETED) {
      throw new BadRequest('email already exist', 409)
    }

    const userExistByCpf = await User.findBy('cpf', body.cpf)
    if (userExistByCpf && userExistByCpf?.accountStatus !== UserAccountStatus.DELETED) {
      throw new BadRequest('cpf already exist', 409)
    }

    const user = await User.create(body)

    return response.created({ user })
  }
}
