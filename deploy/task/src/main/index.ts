import { App } from './config/app'
import chalk from 'chalk'
const app = App()
const port = 3000
app.listen(port, () => {
  const title = chalk.yellow(`  --- Server running on localhost:${port} ---
  `)
  process.stdout.write(`${title}`)
})
