import Route from '@ioc:Adonis/Core/Route'

Route.post('/', 'UsersController.store').prefix('users')
