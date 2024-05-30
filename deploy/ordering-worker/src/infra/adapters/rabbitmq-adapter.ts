import amqp, { type Channel, type Connection } from 'amqplib'
import chalk from 'chalk'
import { ChalkAdapter } from './chalk-adapter'

export class RabbitMqAdapter {
  static connection: Connection
  static channel: Channel
  static connected = false
  static retryCount = 0
  static async connect (): Promise<void> {
    if (!RabbitMqAdapter.connection) {
      try {
        const hostname = process.env.RABBITMQ_URL ?? 'localhost'
        RabbitMqAdapter.connection = await amqp.connect({
          protocol: 'amqp',
          hostname,
          port: 5672,
          vhost: '/',
          heartbeat: 10
        })
        RabbitMqAdapter.connected = true
        RabbitMqAdapter.channel = await RabbitMqAdapter.connection.createChannel()
        ChalkAdapter.say(`--- Connected in RabbitMq ${hostname}:5672 ---
      `, ChalkAdapter.Colors.green)
      } catch (error) {
        if (RabbitMqAdapter.retryCount < 20) {
          RabbitMqAdapter.retryCount++
          setTimeout(async () => {
            try {
              RabbitMqAdapter.connect()
            } catch (error) {

            }
          }, RabbitMqAdapter.retryCount * 1000)
        } else {
          RabbitMqAdapter.connected = false
          ChalkAdapter.say(`Failed connecting on RabbitMQ
        `, ChalkAdapter.Colors.red)
        }

        throw error
      }
    }
  }

  private async createQueue (queueName: string): Promise<void> {
    await RabbitMqAdapter.connect()
    await RabbitMqAdapter.channel.assertQueue(queueName, { durable: true, arguments: { 'x-max-priority': 10 } })
  }

  async subscribe (queueName: string, action: (msg: any) => Promise<void>): Promise<void> {
    try {
      await this.createQueue(queueName)

      RabbitMqAdapter.channel.prefetch(1)
      RabbitMqAdapter.channel.consume(queueName, async (msg) => {
        if (!msg) return
        try {
          await action(msg.content)
          RabbitMqAdapter.channel.ack(msg)
        } catch (error) {
        }
      }, { noAck: false })
    } catch (error) {

    }
  }
}
