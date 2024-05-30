import promClient from 'prom-client'
import { type Router } from 'express'

export const metricsRouter = (router: Router): void => {
  router.get('/metrics', async (req, res) => {
    res.set('Content-Type', promClient.register.contentType)
    res.end(await promClient.register.metrics())
  })
}
