
/**
 *  Cmds.js
 */

import { Observable } from 'rxjs/Observable'
import * as Signal from './Signal'
import * as Task from './Task'

export const none = Observable.empty()

export const fromTask = (task, success, failure) =>
  Observable.create((observer) =>
    task.subscribe(
      (res) => observer.next(success(res)),
      (err) => observer.next(failure(err)),
      () => observer.complete()
    )
  )

export const toTask = (address, cmd) =>
  cmd.flatMap((action) =>
    Signal.send(address, action)
  )

export const batch = (cmds) =>
  Observable.merge(...cmds)

// TODO: needs to handle batched cmds as well
export const map = (func, cmd) =>
  Task.map(func, cmd)
