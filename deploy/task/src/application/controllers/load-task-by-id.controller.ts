import { type PgTaskRepository } from '../../infra/repository/pg-task-repository'
import { type HttpRequest, type httpResponse } from '../contracts/http-request'

export class LoadTaskByIdController {
  constructor (private readonly pgTasksRepository: PgTaskRepository) {}
  async handler (httpRequest: HttpRequest<{ id: string }>): Promise<httpResponse> {
    const { body } = httpRequest
    try {
      const task = await this.pgTasksRepository.loadById(body.id)
      return {
        statusCode: 200,
        body: task
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: `Server error: ${error instanceof Error ? error.message : ''}`
      }
    }
  }
}
