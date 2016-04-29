
/**
 *  Signal.js
 */

import most from 'most'
import { subject } from 'most-subject'

export const Mailbox = (initialValue) => {
  const { observer: signal, stream } = subject(initialValue)
  const address = (message) => {
    signal.next(message)
  }

  return { signal, stream, address }
}

export const forwardTo = (address, tag) =>
  (message) => address(tag(message))

export const send = (address, message) => {
  address(message)
  return most.empty()
}
