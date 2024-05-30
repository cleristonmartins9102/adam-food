import { type PgOrderingTaskParamRepository } from '../../../infra/repository/pg-order-task-param-repository'
import { type PgTaskRepository } from '../../../infra/repository/pg-task-repository'
import { type OrderingTaskParameter, type TaskPriority, TaskStatus, type TaskModel } from '../../models/task-model'

export class DbAddOrder {
  constructor (
    private readonly pgTaskRepository: PgTaskRepository,
    private readonly pgOrderingTaskParamRepository: PgOrderingTaskParamRepository
  ) {}

  async add (data: DbAddOrder.OrderData): Promise<Omit<TaskModel, 'retryCount'> | null> {
    const { price, ...withoutIsVip } = data
    const priority = data.priority
    const handledOrder = { ...withoutIsVip, taskName: 'ordering', priority, retryCount: 0, status: TaskStatus.pending }
    const repoResponse = await this.pgTaskRepository.add(handledOrder)
    if (repoResponse === null) {
      return repoResponse
    }
    const orderingParamData: OrderingTaskParameter = { task: { id: repoResponse, priority, taskName: handledOrder.taskName, status: handledOrder.status, retryCount: handledOrder.retryCount }, description: data.description, idCustomer: data.idCustomer, price: data.price.toString(), items: data.items }
    try {
      await this.pgOrderingTaskParamRepository.add(orderingParamData)
    } catch (error) {
      console.log(error)
    }
    const { retryCount, ...withourRetryCounter } = handledOrder

    return { id: repoResponse, ...withourRetryCounter }
  }
}

export namespace DbAddOrder {
  export type OrderData = {
    idCustomer: string
    items: string
    price: number
    description: string
    isVip?: boolean
    priority: TaskPriority
  }
}
