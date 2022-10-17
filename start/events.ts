import Event from '@ioc:Adonis/Core/Event'

Event.on('user:pending', 'User.onUserAsPending')
