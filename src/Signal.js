
/**
 *  Signal.js
 */

import { Observable, BehaviorSubject } from 'rxjs'

export const merge = Observable.merge

export const Mailbox = (initialValue) => {
  const signal = new BehaviorSubject(initialValue)
  const address = (msg) => signal.next(msg)

  return { signal, address }
}

export const forwardTo = (address, tag) =>
  (msg) => address(tag(msg))

export const send = (address, msg) => {
  address(msg)
  return Observable.empty()
}
