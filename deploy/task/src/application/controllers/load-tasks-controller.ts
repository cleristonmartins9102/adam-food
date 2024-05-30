import { type PgTaskRepository } from '../../infra/repository/pg-task-repository'
import { type httpResponse } from '../contracts/http-request'

export class LoadTasksController {
  constructor (private readonly pgTasksRepository: PgTaskRepository) {}
  async handler (): Promise<httpResponse> {
    try {
      const tasks = await this.pgTasksRepository.load()
      return {
        statusCode: 200,
        body: tasks
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: `Server error: ${error instanceof Error ? error.message : ''}`
      }
    }
  }
}
