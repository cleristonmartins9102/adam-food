import { setupRequeueUncompletedTasks, type RetryUncompletedTasks } from '../../data/features/ordering/retry-tasks'
import { RabbitMqAdapter } from '../../infra/adapters/rabbitmq-adapter'
import { PgTaskRepository } from '../../infra/repository/pg-task-repository'

export const setupRequeueUncompletedTasksFactory = (): RetryUncompletedTasks => {
  const pgTasksRepository = new PgTaskRepository()
  const rabbitMqAdapter = new RabbitMqAdapter()
  return setupRequeueUncompletedTasks(pgTasksRepository, rabbitMqAdapter)
}
