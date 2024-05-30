import { ChalkAdapter } from '../../infra/adapters/chalk-adapter'
import { TaskStatus } from '../models/task-model'
import { type LoadTaskById } from './remote-load-task-by-id'
import { type UpdateTaskStatus } from './remote-update-task-status'

export class ProcessOrder {
  retryCount = 0
  constructor (
    private readonly remoteLoadTaskSById: LoadTaskById,
    private readonly remoteUpdateTaskStatus: UpdateTaskStatus
  ) {}

  /**
   *
   * @param order
   * @param taskData this parameter is used for re-trying receiving the task to aim avoid making another request to collect task again
   */
  async perform (order: string, taskData?: any): Promise<void> {
    const jsonOrder = JSON.parse(order)
    ChalkAdapter.say(`
    --Processing order
    `, ChalkAdapter.Colors.yellow)
    ChalkAdapter.say('  (id: ', ChalkAdapter.Colors.yellow)
    ChalkAdapter.say(`${jsonOrder.taskId as string})
    `, ChalkAdapter.Colors.green)
    const task = taskData ?? await this.remoteLoadTaskSById(jsonOrder.taskId as string)
    if (task) {
      try {
        await this.remoteUpdateTaskStatus(jsonOrder.taskId as string, TaskStatus.inprogress)
        // Simulating fail
        // throw Error('')
        setTimeout(async () => {
          // Simulating processing ordering task success 5000ms
          await this.remoteUpdateTaskStatus(jsonOrder.taskId as string, TaskStatus.completed)
        }, 5000)
      } catch (error) {
        // As MAX_RETRY is 10 then the max total retrying is 65s
        const max = process.env.MAX_RETRY as unknown as number
        if (this.retryCount <= max) {
          this.retryCount++
          setTimeout(async () => {
            await this.perform(order, task)
          }, this.retryCount * 1000)
        } else {
          await this.remoteUpdateTaskStatus(jsonOrder.taskId as string, TaskStatus.failed)
        }
      }
    }
  }
}
