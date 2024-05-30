export enum TaskPriority {
  hight = 'hight',
  medium = 'medium',
  low = 'low'
}

export enum TaskType {
  ordering = 'ordering',
  notify_customer = 'notify_customer',
  notify_deliver = 'notify_deliver'
}

export enum TaskStatus {
  pending = 'pending',
  inprogress = 'in-progress',
  completed = 'completed',
  failed = 'failed',

}

export type TaskModel = {
  id?: string
  taskName: string
  status: TaskStatus
  priority: TaskPriority
  retryCount: number
}

export type OrderTaskType = TaskModel & {
  idCustomer: string
  items: string
  isVip: boolean
  price: string
  description: string
}

export type OrderingTaskParameter = Omit<Omit<Omit<Omit<Omit<OrderTaskType, 'isVip'>, 'retryCount'>, 'priority'>, 'status'>, 'taskName'> & {
  task: TaskModel
}
