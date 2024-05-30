import { json, type Express } from 'express'

export const setupMiddlewares = (app: Express): void => {
  app.use(json())
}
