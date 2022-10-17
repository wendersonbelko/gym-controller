import Mail from '@ioc:Adonis/Addons/Mail'
import type { EventsList } from '@ioc:Adonis/Core/Event'

export default class User {
  public async onUserAsPending(data: EventsList['user:pending']) {
    Mail.send((message) => {
      message
        .from('no-reply@meliuz.com.br')
        .to(data.email)
        .subject(`Bem vindo ${data.name}! Verifique sua conta agora.`)
        .text(`Para confirmar sua contas, basta clicar no link: ${data.verifyUrl}`)
    })
  }
}
