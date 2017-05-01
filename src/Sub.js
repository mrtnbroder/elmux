
/**
 *  Sub.js
 */

import { Observable as O } from 'rxjs/Observable'
import * as Signal from './Signal'
import * as Task from './Task'

// none :: Sub msg
export const none = O.empty()

// batch :: List (Sub msg) -> Sub msg
export const batch = (msgs) => O.merge(...msgs)

// map :: (a -> Sub msg) -> Sub a -> Sub msg
export const map = (f, x) => Task.map(f, x)

export const toTask = (address, cmd) =>
  cmd.flatMap((msg) =>
    Signal.send(address, msg)
  )
