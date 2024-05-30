import { RabbitMqAdapter } from '../../infra/adapters/rabbitmq-adapter'

export const connectRabbitMq = (): void => {
  RabbitMqAdapter.connect()
}
