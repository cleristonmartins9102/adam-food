import { TaskStatus, TaskType, type TaskModel } from '../../data/models/task-model'
import { pgConnection } from './helper/connection'
import { PgOrderingTaskParamRepository } from './pg-order-task-param-repository'

export class PgTaskRepository {
  async add (data: TaskModel): Promise<string | null> {
    const result = await pgConnection.query('INSERT INTO tasks (task_name, status, priority)VALUES($1, $2, $3) returning id', [data.taskName, data.status, data.priority])
    if (result.rowCount && result.rowCount > 0) {
      return result.rows[0].id.toString()
    }
    return null
  }

  async load (): Promise<TaskModel[] | []> {
    const result = await pgConnection.query('SELECT * from tasks')
    if (result.rowCount && result.rowCount > 0) {
      return result.rows.map(task => ({ id: task.id.toString(), ...task }))
    }
    return []
  }

  async updateStatus (id: string, status: string): Promise<boolean> {
    const result = await pgConnection.query('UPDATE tasks set status=$1 where id=$2', [status, id])
    if (result.rowCount) {
      return result.rowCount > 0
    }
    return false
  }

  async loadById (id: string): Promise<TaskModel | null> {
    const result = await pgConnection.query('SELECT * from tasks where id=$1', [id])
    if (result.rowCount && result.rowCount > 0) {
      const taskParam = result.rows[0]
      let response = ({ id: result.rows[0].id.toString(), ...result.rows[0] })
      if (taskParam.task_name === TaskType.ordering) {
        const pgOrderingTaskParamRepo = new PgOrderingTaskParamRepository()
        const taskParameters = await pgOrderingTaskParamRepo.loadByIdTask(taskParam.id as string)
        if (taskParameters && taskParameters.task) {
          const { task, id, ...cleanedTaskParameters } = taskParameters
          response = { ...response, parameters: cleanedTaskParameters }
        }
      }
      return response
    }
    return null
  }

  async loadUncompleted (): Promise<TaskModel[] | []> {
    const result = await pgConnection.query('SELECT * from tasks where status=$1 or status=$2', [TaskStatus.failed, TaskStatus.pending])
    if (result.rowCount && result.rowCount > 0) {
      return this.map(result.rows.map(task => ({ id: task.id.toString(), ...task })))
    }
    return []
  }

  private map (tasks: any[]): TaskModel[] {
    const handledTasks: any [] = []
    for (const task of tasks) {
      handledTasks.push({ id: task.id, taskName: task.task_name, priority: task.priority, status: task.status, retry_count: task.retry_count })
    }
    return handledTasks
  }
}
