import { TaskType } from '../data/models/task-model'
import { RabbitMqAdapter } from '../infra/adapters/rabbitmq-adapter'
import { processOrderFactory } from './factories/process-order-factory'
import { App } from './config/app'
import chalk from 'chalk'
const rab = new RabbitMqAdapter()
const processOrder = processOrderFactory()
rab.subscribe(TaskType.ordering, async (msg) => { processOrder.perform(msg.toString() as string) })
const app = App()
const port = process.env.APP_PORT

app.listen(port, () => {
  const title = chalk.yellow(`  --- Server application running on localhost:${port} ---
  `)
  process.stdout.write(`${title}`)
})
