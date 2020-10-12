import { Task } from '$/types'

export type Methods = {
  get: {
    query?: {
      limit?: number
    }

    resBody: Task[]
  }
  post: {
    reqBody: Pick<Task, 'label'>
    resBody: Task
  }
}
