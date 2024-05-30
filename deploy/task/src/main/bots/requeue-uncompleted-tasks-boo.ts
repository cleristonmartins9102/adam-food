import { NodeCronAdapter } from '../../infra/adapters/node-cron-adapter'
import { setupRequeueUncompletedTasksFactory } from '../factories/setup-retry-tasks-factory'

export const requeueUncompletedTasksBot = (): void => {
  const nodeCron = new NodeCronAdapter()
  const retryTime = process.env.REQUEUE_RETRY_TIME as unknown as number
  nodeCron.schedule({ minute: retryTime }, setupRequeueUncompletedTasksFactory())
}
