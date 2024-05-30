import { Router, type Express } from 'express'
import { metricsRouter } from '../routers/metric-router'
import { overloadComputationRouter } from '../routers/overload-computation-router'
import { healthCheckRouter } from '../routers/health-check-router'
import { readinessCheckRouter } from '../routers/readiness-check-router'

export const setupRouters = (app: Express): void => {
  const publicRounter = Router()
  const mantenainceRouter = Router()
  app.use('/api', publicRounter)
  app.use(mantenainceRouter)
  metricsRouter(publicRounter)
  overloadComputationRouter(mantenainceRouter)
  healthCheckRouter(mantenainceRouter)
  readinessCheckRouter(mantenainceRouter)
}
