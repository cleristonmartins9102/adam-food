import { ChalkAdapter } from '../../infra/adapters/chalk-adapter'
import { type PgTaskRepository } from '../../infra/repository/pg-task-repository'
import { type HttpRequest, type httpResponse } from '../contracts/http-request'

export class UpdateTaskStatusController {
  constructor (private readonly pgTasksRepository: PgTaskRepository) {}
  async handler (httpRequest: HttpRequest<{ id: string, status: string }>): Promise<httpResponse> {
    try {
      const { body } = httpRequest
      ChalkAdapter.say(`
      --Updating task
      `, ChalkAdapter.Colors.yellow)
      ChalkAdapter.say('  (id:', ChalkAdapter.Colors.white)
      ChalkAdapter.say(body.id, ChalkAdapter.Colors.green)
      ChalkAdapter.say(' - status:', ChalkAdapter.Colors.white)
      ChalkAdapter.say(`${body.status.toUpperCase()})
      `, ChalkAdapter.Colors.green)

      const tasks = await this.pgTasksRepository.updateStatus(body.id, body.status)
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
