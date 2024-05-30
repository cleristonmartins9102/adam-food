import { TaskPriority } from '../models/task-model'

/**
 * Function to convert Priority string to a number level
 * @param priority TaskPriority
 * @returns number
 */
export const definePriorityLevel = (priority: string): number => {
  return priority === TaskPriority.hight ? 10 : (priority === TaskPriority.medium ? 5 : 1)
}
