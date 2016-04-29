
/**
 *  Effects.js
 */

import most from 'most'
import * as Signal from './Signal'
import * as Task from './Task'

export const none = most.empty

export const fromTask = (task, success, failure) =>
  most.create((add, end, err) =>
    task.observe((res) => add(success(res))).catch((res) => err(failure(res)))
  ).take(1)

export const toTask = (address, effect) =>
  effect.flatMap((action) =>
    Signal.send(address, action)
  )

export const batch = (...effects) =>
  most.merge(...effects)

// TODO: needs to handle batched effects as well
export const map = (func, effect) =>
  Task.map(func, effect)
