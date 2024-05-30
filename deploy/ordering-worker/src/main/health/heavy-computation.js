import { parentPort } from 'worker_threads'

const endTime = Date.now() + 12000
while (Date.now() < endTime) {
  console.log(Math.sqrt(Math.random()))
}

parentPort.postMessage('done')
