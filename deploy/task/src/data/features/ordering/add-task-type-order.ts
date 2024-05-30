import { MissingParamError } from '../../../application/errors/errors'
import { type RabbitMqAdapter } from '../../../infra/adapters/rabbitmq-adapter'
import { TaskPriority, type TaskModel } from '../../models/task-model'
import { definePriorityLevel } from '../../services/define-priority-level-service'
import { type DbAddOrder } from './db-add-order'
import amqp from 'amqplib'

export type OrderingDataType = DbAddOrder.OrderData
export type AddTaskOfTypeOrdering = (data: OrderingDataType) => Promise<Return>
type Return = Omit<TaskModel, 'retryCount'> | null
type SetupAddTaskOfTypeOrdering = (dbAddOrder: DbAddOrder, rabbitmqAdapter: RabbitMqAdapter) => AddTaskOfTypeOrdering

export const setupAddTaskOfTypeOrdering: SetupAddTaskOfTypeOrdering = (dbAddOrder, rabbitmqAdapter) => async (data) => {
  const { idCustomer, items, price, description, isVip } = data
  // Validating
  const error = new MissingParamError()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  if (!idCustomer || isNaN(idCustomer as any)) error.throw('idCustomer')
  if (!items || !Array.isArray(items)) error.throw('items')
  if (!price || isNaN(price)) error.throw('price')
  if (!description) error.throw('description')
  if (!isVip || typeof isVip !== 'boolean') error.throw('isVip')
  if (error.serialize().parameters.length > 0) {
    throw error
  }

  const isbigOrder = price > 200 ? TaskPriority.medium : TaskPriority.low
  const priority = isVip ? TaskPriority.hight : isbigOrder
  const priorityLevel = definePriorityLevel(priority)

  // Saving on Database
  const dbResponse = await dbAddOrder.add({ idCustomer, items, price, description, priority })

  // Sending message system
  await rabbitmqAdapter.sendMessage('ordering', JSON.stringify({ taskId: dbResponse?.id, taskName: dbResponse?.taskName, priority: dbResponse?.priority }), priorityLevel)

  return dbResponse
}
