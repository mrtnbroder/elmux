
/**
 *  Cmd.js
 */

import { Observable } from 'rxjs/Observable'
import * as Task from './Task'

// none :: Cmd msg
export const none = Observable.empty()

// batch :: List (Cmd msg) -> Cmd msg
export const batch = (msg) =>
  Observable.merge(...msg)

// map :: (a -> Cmd msg) -> Cmd a -> Cmd msg
export const map = (func, sub) =>
  Task.map(func, sub)
