import { ProcessOrder } from '../../data/features/process-order'
import { setupRemoteLoadTaskById } from '../../data/features/remote-load-task-by-id'
import { setupRemoteUpdateTaskStatus } from '../../data/features/remote-update-task-status'
import { HttpClient } from '../../infra/adapters/http-client'

export const processOrderFactory = (): ProcessOrder => {
  const httpClient = new HttpClient()
  const remoteLoadTaskById = setupRemoteLoadTaskById(httpClient)
  const remoteUpdateTaskStatus = setupRemoteUpdateTaskStatus(httpClient)
  const processOrder = new ProcessOrder(remoteLoadTaskById, remoteUpdateTaskStatus)
  return processOrder
}
