
/**
 *  Task
 */

import { Observable as O } from 'rxjs'

// perform : (x -> msg) -> (a -> msg) -> Task x a -> Cmd msg
export const perform = (onFail, onSuccess, task) =>
  O.create((observer) =>
    task.subscribe(
      (res) => {
        observer.next(onSuccess(res))
        observer.complete()
      },
      (err) => {
        observer.next(onFail(err))
        observer.complete()
      }
    )
  )

// map : (a -> b) -> Task x a -> Task x b
export const map = (func, taskA) =>
  O.create((observer) =>
    taskA.subscribe(
      (x) => {
        observer.next(func(x))
        observer.complete()
      }
    )
  )
