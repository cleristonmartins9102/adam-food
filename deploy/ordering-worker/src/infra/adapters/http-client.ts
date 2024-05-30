import axios from 'axios'

export class HttpClient {
  async request (options: HttpClient.Options): Promise<any> {
    let httpResponse: any
    try {
      httpResponse = (await axios.request({ method: options.method, url: options.url, data: options.data })).data
    } catch (error) {
    }
    return httpResponse
  }
}

export namespace HttpClient {
  export enum Method {
    post = 'post'
  }
  export type Options = {
    method: Method
    url: string
    data: unknown
  }
}
