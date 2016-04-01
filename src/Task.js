
/**
 *  Task
 */

import { Observable } from 'rxjs'

export const map = (func, taskA) =>
  Observable.create((observer) =>
    taskA.subscribe(
      (a) => {
        observer.next(func(a))
        observer.complete()
      }
    )
  )
