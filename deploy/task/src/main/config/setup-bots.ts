import { requeueUncompletedTasksBot } from '../bots/requeue-uncompleted-tasks-boo'

export const setupBots = (): void => {
  requeueUncompletedTasksBot()
}
