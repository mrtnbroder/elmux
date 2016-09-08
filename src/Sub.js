
/**
 *  Sub.js
 */

import { Observable } from 'rxjs/Observable'
import * as Task from './Task'

// none :: Sub msg
export const none = Observable.empty()

// batch :: List (Sub msg) -> Sub msg
export const batch = (msg) =>
  Observable.merge(...msg)

// map :: (a -> Sub msg) -> Sub a -> Sub msg
export const map = (func, sub) =>
  Task.map(func, sub)
