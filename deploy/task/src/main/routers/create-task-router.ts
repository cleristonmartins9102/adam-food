import { type Router } from 'express'
import { AddTaskController } from '../../application/controllers/add-task-controller'
import { DbAddOrder } from '../../data/features/ordering/db-add-order'
import { PgTaskRepository } from '../../infra/repository/pg-task-repository'
import { setupAddTaskOfTypeOrdering } from '../../data/features/ordering/add-task-type-order'
import { PgOrderingTaskParamRepository } from '../../infra/repository/pg-order-task-param-repository'
import { RabbitMqAdapter } from '../../infra/adapters/rabbitmq-adapter'

export const createTaskRouter = (router: Router): void => {
  router.post('/task/create', (req, res, next) => {
    const { body } = req
    const pgTaskRepository = new PgTaskRepository()
    const pgOrderingTaskParamRepository = new PgOrderingTaskParamRepository()
    const dbAddOrder = new DbAddOrder(pgTaskRepository, pgOrderingTaskParamRepository)
    const rabbitmqAdapter = new RabbitMqAdapter()
    const addTaskOrdering = setupAddTaskOfTypeOrdering(dbAddOrder, rabbitmqAdapter)
    const controller = new AddTaskController(addTaskOrdering)
    controller.handler({ body }).then(r => res.status(r!.statusCode).json(r!.body))
  })
}
