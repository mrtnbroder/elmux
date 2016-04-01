
/**
 *  Effects.js
 */

import { Observable } from 'rxjs/Observable'
import * as Signal from './Signal'
import * as Task from './Task'

export const none = Observable.empty

export const fromTask = (task, success, failure) =>
  Observable.create((observer) =>
    task.subscribe(
      (res) => observer.next(success(res)),
      (err) => observer.next(failure(err)),
      () => observer.complete()
    )
  )

export const toTask = (address, effect) =>
  effect.flatMap((action) =>
    Signal.send(address, action)
  )

export const batch = (...effects) =>
  Observable.merge(...effects)

// TODO: needs to handle batched effects as well
export const map = (func, effect) =>
  Task.map(func, effect)
