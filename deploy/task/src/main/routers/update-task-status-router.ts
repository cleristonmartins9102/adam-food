import { type Router } from 'express'
import { PgTaskRepository } from '../../infra/repository/pg-task-repository'
import { UpdateTaskStatusController } from '../../application/controllers/update-task-status-controller'

export const updateTaskStatusRouter = (router: Router): void => {
  router.post('/task/update', (req, res, next) => {
    const pgTaskRepository = new PgTaskRepository()
    const controller = new UpdateTaskStatusController(pgTaskRepository)
    controller.handler({ body: req.body }).then(r => res.status(r.statusCode).send(r.body))
  })
}
