import express, { json, type Express } from 'express'
import { setupRouters } from './setup-routers'
import { setupMiddlewares } from './setup-middlewares'

export const App = (): Express => {
  const App = express()
  setupMiddlewares(App)
  setupRouters(App)
  return App
}
