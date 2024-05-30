import { type Router } from 'express'
import { PgTaskRepository } from '../../infra/repository/pg-task-repository'
import { LoadTasksController } from '../../application/controllers/load-tasks-controller'

export const loadTasksRouter = (router: Router): void => {
  router.get('/task/load', (req, res, next) => {
    const pgTaskRepository = new PgTaskRepository()
    const controller = new LoadTasksController(pgTaskRepository)
    controller.handler().then(r => res.status(r.statusCode).send(r.body))
  })
}
