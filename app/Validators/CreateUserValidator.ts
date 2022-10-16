import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({}, [rules.email()]),
    name: schema.string({}),
    password: schema.string({}, [rules.minLength(8)]),
    cpf: schema.string({}, [rules.minLength(11), rules.maxLength(11)]),
    birthday: schema.date({}),
  })

  public messages: CustomMessages = {}
}
