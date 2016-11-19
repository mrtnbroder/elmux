
/**
 *  Task
 */

import { Observable as O } from 'rxjs'
import * as Signal from './Signal'

// perform :: (a -> msg) -> Task Never a -> Cmd msg
export const perform = (onSuccess, onError, task) =>
  O.create((observer) =>
    task.subscribe(
      (res) => observer.next(onSuccess(res)),
      (err) => observer.next(onError(err)),
      () => observer.complete(),
    )
  )

export const toTask = (address, cmd) =>
  cmd.flatMap((msg) =>
    Signal.send(address, msg)
  )

// map :: (a -> b) -> Task x a -> Task x b
export const map = (func, taskA) =>
  O.create((observer) =>
    taskA.subscribe(
      (a) => {
        observer.next(func(a))
        observer.complete()
      }
    )
  )
