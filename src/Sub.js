
/**
 *  Sub.js
 */

import { Observable as O } from 'rxjs/Observable'
import * as Task from './Task'

// none :: Sub msg
export const none = O.empty()

// batch :: List (Sub msg) -> Sub msg
export const batch = (msg) =>
  O.merge(...msg)

// map :: (a -> Sub msg) -> Sub a -> Sub msg
export const map = (func, sub) =>
  Task.map(func, sub)
