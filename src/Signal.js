
/**
 *  Signal.js
 */

import { Observable, BehaviorSubject } from 'rxjs'

export const merge = Observable.merge

export const Mailbox = (initialValue) => {
  const signal = new BehaviorSubject(initialValue)
  const address = (message) => signal.next(message)

  return { signal, address }
}

export const forwardTo = (address, tag) =>
  (message) => address(tag(message))

export const send = (address, message) => {
  address(message)
  return Observable.empty()
}
