import { Router, type Express } from 'express'
import { createTaskRouter } from '../routers/create-task-router'
import { loadTasksRouter } from '../routers/load-tasks-router'
import { loadTaskByIdRouter } from '../routers/load-task-by-id-router'
import { updateTaskStatusRouter } from '../routers/update-task-status-router'

export const setupRouters = (app: Express): void => {
  const router = Router()
  app.use('/api', router)
  createTaskRouter(router)
  loadTasksRouter(router)
  loadTaskByIdRouter(router)
  updateTaskStatusRouter(router)
}
