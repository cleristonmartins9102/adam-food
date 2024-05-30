import promClient from 'prom-client'
import { type Router } from 'express'

export const healthCheckRouter = (router: Router): void => {
  router.get('/health', async (req, res) => {
    res.status(200).send({ status: 'alive' })
  })
}
