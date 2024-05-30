import { type Router } from 'express'
import { Worker } from 'worker_threads'

/**
 * Router for test autoscaling, it will burn CPU for 120s
 * @param router
 */
export const overloadComputationRouter = (router: Router): void => {
  router.get('/overload', async (req, res) => {
    try {
      await runHeavyComputation()
      res.status(200).send('CPU Load Test Completed')
    } catch (err) {
      res.status(500).send('Failed to complete CPU Load Test')
    }
  })
}

const runHeavyComputation = async (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./src/main/health/heavy-computation.js')
    worker.on('message', resolve)
    worker.on('error', reject)
    worker.on('exit', (code) => {
      if (code !== 0) {
        reject(new Error(`Worker stopped with exit code ${code}`))
      }
    })
  })
}
