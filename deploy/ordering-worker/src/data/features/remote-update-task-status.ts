import { HttpClient } from '../../infra/adapters/http-client'

export type UpdateTaskStatus = (id: string, status: string) => Promise<void>

type SetupRemoteUpdateTaskStatus = (httpClient: HttpClient) => UpdateTaskStatus

export const setupRemoteUpdateTaskStatus: SetupRemoteUpdateTaskStatus = (httpClient) => async (id, status) => {
  await httpClient.request({ method: HttpClient.Method.post, url: `${process.env.API_TASK_URL}/task/update`, data: { id, status } })
}
