import { type AddTaskOfTypeOrdering } from '../../data/features/ordering/add-task-type-order'
import { type DbAddOrder } from '../../data/features/ordering/db-add-order'
import { type OrderTaskType, TaskType, TaskPriority } from '../../data/models/task-model'
import { RabbitMqAdapter } from '../../infra/adapters/rabbitmq-adapter'
import { type httpResponse, type HttpRequest } from '../contracts/http-request'
import { CustomError } from '../errors/errors'

export class AddTaskController {
  constructor (private readonly addTaskOfTypeOrdering: AddTaskOfTypeOrdering) {}
  async handler <BodyType=AddTaskController.BodyType>(httpRequest: HttpRequest<BodyType>): Promise<httpResponse | undefined> {
    try {
      const body = httpRequest?.body as AddTaskController.BodyType
      // Validating if exists type task and match with allowed types of tasks as the enumerated tasks
      if (!body.typeTask || !Object.values(TaskType).includes(body.typeTask)) {
        return {
          statusCode: 400,
          body: {
            error: {
              code: 'Missing param error',
              parameters: ['typeTask']
            }
          }
        }
      }
      // If is ordering tasks
      if (body.typeTask === TaskType.ordering) {
        const { idCustomer, items, price, description, isVip } = body
        try {
          const addTaskOfTypeOrderingResponse = await this.addTaskOfTypeOrdering({ idCustomer, items, price: parseInt(price), description, isVip, priority: TaskPriority.hight })
          return {
            statusCode: 201,
            body: addTaskOfTypeOrderingResponse
          }
        } catch (error) {
          if (error instanceof CustomError) {
            return {
              statusCode: 400,
              body: error.serialize()
            }
          }
        }
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: {
          error: `Server Error: ${error instanceof Error ? error.message : ''}`
        }
      }
    }
  }
}

export namespace AddTaskController {
  export type BodyType = {
    typeTask: TaskType
  } & OrderTaskType
}
