
/**
 *  Task
 */

import { Observable } from 'rxjs'
import * as Signal from './Signal'

export const perform = (onFail, onSuccess, task) =>
  Observable.create((observer) =>
    task.subscribe(
      (res) => observer.next(onSuccess(res)),
      (err) => observer.next(onFail(err)),
      () => observer.complete()
    )
  )

export const toTask = (address, cmd) =>
  cmd.flatMap((msg) =>
    Signal.send(address, msg)
  )

export const map = (func, taskA) =>
  Observable.create((observer) =>
    taskA.subscribe(
      (a) => {
        observer.next(func(a))
        observer.complete()
      }
    )
  )
