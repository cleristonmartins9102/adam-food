export type HttpRequest<bodyType = unknown> = {
  body: bodyType
}

export type httpResponse = {
  statusCode: number
  body: unknown
}
