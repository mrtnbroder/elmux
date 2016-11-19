
/**
 *  Signal.js
 */

import { Observable as O, BehaviorSubject } from 'rxjs'

export const merge = O.merge

export const Mailbox = (initialValue) => {
  const signal = new BehaviorSubject(initialValue)
  const address = (msg) => signal.next(msg)

  return { signal, address }
}

export const forwardTo = (address, tag) =>
  (msg) => address(tag(msg))

export const send = (address, msg) => {
  address(msg)
  return O.empty()
}
