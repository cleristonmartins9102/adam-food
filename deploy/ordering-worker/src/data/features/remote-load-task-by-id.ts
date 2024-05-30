import { HttpClient } from '../../infra/adapters/http-client'
import { type TaskModel } from '../models/task-model'

export type LoadTaskById = (id: string) => Promise<TaskModel>

type SetupRemoteLoadTaskById = (httpClient: HttpClient) => LoadTaskById

export const setupRemoteLoadTaskById: SetupRemoteLoadTaskById = (httpClient) => async (id) => {
  return await httpClient.request({ method: HttpClient.Method.post, url: `${process.env.API_TASK_URL}/task/loadbyid`, data: { id } })
}
