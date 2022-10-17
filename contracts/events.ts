declare module '@ioc:Adonis/Core/Event' {
  interface EventsList {
    'user:pending': {
      name: string
      email: string
      verifyUrl: string
    }
  }
}
