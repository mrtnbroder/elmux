
/**
 *  Cmd.js
 */

import { Observable as O } from 'rxjs/Observable'
import * as Task from './Task'

// none :: Cmd msg
export const none = O.empty()

// batch :: List (Cmd msg) -> Cmd msg
export const batch = (msg) =>
  O.merge(...msg)

// map :: (a -> Cmd msg) -> Cmd a -> Cmd msg
export const map = (func, sub) =>
  Task.map(func, sub)
