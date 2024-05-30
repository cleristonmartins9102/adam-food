import { ChalkAdapter } from '../../../infra/adapters/chalk-adapter'
import { type RabbitMqAdapter } from '../../../infra/adapters/rabbitmq-adapter'
import { type PgTaskRepository } from '../../../infra/repository/pg-task-repository'
import { definePriorityLevel } from '../../services/define-priority-level-service'

export type RetryUncompletedTasks = () => Promise<void>
type SetupRetryTasks = ((pgTasksRepository: PgTaskRepository, rabbitMqAdapter: RabbitMqAdapter) => RetryUncompletedTasks)

export const setupRequeueUncompletedTasks: SetupRetryTasks = (pgTasksRepository, rabbitMqAdapter) => async () => {
  const uncompletedTasks = await pgTasksRepository.loadUncompleted()
  for (const task of uncompletedTasks) {
    await rabbitMqAdapter.sendMessage(task.taskName, JSON.stringify({ taskId: task?.id, taskName: task?.taskName, priority: task?.priority }), definePriorityLevel(task.priority))
    ChalkAdapter.say(`Task ${task.id} was re-queued
    `, ChalkAdapter.Colors.red)
  }
}
