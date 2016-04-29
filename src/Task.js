
/**
 *  Task
 */

import most from 'most'
import { identity } from 'ramda'

export const map = (func, taskA) =>
  most.create((add, end, error) =>
    taskA.observe((a) => add(func(a)))
  ).take(1)
