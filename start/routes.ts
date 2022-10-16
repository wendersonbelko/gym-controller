import Route from '@ioc:Adonis/Core/Route'
import './routes/user'

Route.get('/', async ({ view }) => {
  const specUrl = 'docs'
  return view.render('swagger', { specUrl })
})
