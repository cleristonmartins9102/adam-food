import express, { json, type Express } from 'express'
import { setupRouters } from './setup-routers'
import { setupMiddlewares } from './setup-middlewares'
import { connectRabbitMq } from './connect-rabbitm'
import { setupBots } from './setup-bots'

export const App = (): Express => {
  const App = express()
  setupMiddlewares(App)
  setupRouters(App)
  connectRabbitMq()
  setupBots()
  return App
}
