import { type Router } from 'express'
import { PgTaskRepository } from '../../infra/repository/pg-task-repository'
import { LoadTaskByIdController } from '../../application/controllers/load-task-by-id.controller'

export const loadTaskByIdRouter = (router: Router): void => {
  router.post('/task/loadbyid', (req, res, next) => {
    const pgTaskRepository = new PgTaskRepository()
    const controller = new LoadTaskByIdController(pgTaskRepository)
    controller.handler({ body: req.body }).then(r => res.status(r.statusCode).send(r.body))
  })
}
