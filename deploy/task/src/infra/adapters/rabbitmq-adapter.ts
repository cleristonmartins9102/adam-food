import amqp, { type Channel, type Connection } from 'amqplib'
import chalk from 'chalk'

export class RabbitMqAdapter {
  static connection: Connection
  static channel: Channel
  static async connect (): Promise<void> {
    const port = 5672
    const hostname = process.env.RABBITMQ_URL ?? 'localhost'
    RabbitMqAdapter.connection = await amqp.connect({
      protocol: 'amqp',
      hostname,
      port,
      vhost: '/',
      heartbeat: 10
    })
    RabbitMqAdapter.channel = await RabbitMqAdapter.connection.createChannel()
    const title = chalk.green(`--- Connected in RabbitMq ${hostname}:${port} ---
    `)
    process.stdout.write(`${title} 
`)
  }

  private async createQueue (queueName: string): Promise<void> {
    if (!RabbitMqAdapter.connection) { await RabbitMqAdapter.connect() }
    await RabbitMqAdapter.channel.assertQueue(queueName, { durable: true, arguments: { 'x-max-priority': 10 } })
  }

  async sendMessage (queueName: string, message: string, priority: number): Promise<void> {
    await this.createQueue(queueName)
    RabbitMqAdapter.channel.sendToQueue(queueName, Buffer.from(message), { persistent: true, priority })
  }
}
