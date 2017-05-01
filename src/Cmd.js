
/**
 *  Cmd.js
 */

import { Observable as O } from 'rxjs/Observable'
import * as Signal from './Signal'
import * as Task from './Task'

// none :: Cmd msg
export const none = O.empty()

// batch :: List (Cmd msg) -> Cmd msg
export const batch = (msgs) => O.merge(...msgs)

// map :: (a -> Cmd msg) -> Cmd a -> Cmd msg
export const map = (f, x) => Task.map(f, x)

export const toTask = (address, cmd) =>
  cmd.flatMap((msg) =>
    Signal.send(address, msg)
  )