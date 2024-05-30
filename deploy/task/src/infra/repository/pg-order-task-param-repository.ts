import { type OrderingTaskParameter, type TaskModel } from '../../data/models/task-model'
import { pgConnection } from './helper/connection'

export class PgOrderingTaskParamRepository {
  async add (data: OrderingTaskParameter): Promise<string | null> {
    const result = await pgConnection.query('INSERT INTO ordering_tasks_parameters (task, id_customer, description, items, price)VALUES($1, $2, $3, $4, $5) returning id', [data.task.id, data.idCustomer, data.description, data.items, data.price])
    if (result.rowCount && result.rowCount > 0) {
      return result.rows[0].id.toString()
    }
    return null
  }

  async loadByIdTask (id: string): Promise<OrderingTaskParameter | null> {
    const result = await pgConnection.query('SELECT * from ordering_tasks_parameters where task = $1', [id])
    if (result.rowCount && result.rowCount > 0) {
      const task = result.rows[0]
      return { id: task.id.toString(), ...task }
    }
    return null
  }
}
