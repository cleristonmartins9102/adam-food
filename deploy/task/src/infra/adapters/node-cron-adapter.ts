import cron from 'node-cron'

export class NodeCronAdapter {
  schedule (settings: NodeCronAdapter.ScheduleSettings, action: () => void): void {
    const { minute } = settings
    cron.schedule(`*/${minute} * * * *`, () => {
      action()
    })
  }
}

export namespace NodeCronAdapter {
  export type ScheduleSettings = {
    minute: number
  }
}
