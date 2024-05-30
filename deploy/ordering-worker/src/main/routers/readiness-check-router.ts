import { type Router } from 'express'
import { RabbitMqAdapter } from '../../infra/adapters/rabbitmq-adapter'

export const readinessCheckRouter = (router: Router): void => {
  router.get('/readiness', async (req, res) => {
    let status = 200
    const message = { status: 'ready' }
    if (!RabbitMqAdapter.connected) {
      status = 500
      message.status = 'Failed'
    }
    res.status(status).send(message)
  })
}
