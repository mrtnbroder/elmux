
/**
 *  Program.js
 */

import { Observable as O } from 'rxjs'
import * as Signal from './Signal'
import * as Cmd from './Cmd'
import * as Sub from './Sub'
import * as Task from './Task'
import { reduce, map, flip, nth, curry } from 'ramda'

const defaultConfig = (conf) => ({
  subscriptions: () => Sub.none,
  ...conf
})

export const program = (conf) => {
  const config = defaultConfig(conf)
  const messages = Signal.Mailbox([])
  const singleton = (msg) => [msg]
  const address = Signal.forwardTo(messages.address, singleton)
  const updateStep = ([oldModel, accumulatedCmds], msg) => {
    const [newModel, additionalCmds] = config.update(msg, oldModel)

    return [newModel, Cmd.batch([accumulatedCmds, additionalCmds])]
  }
  const update = (msgs, [model]) => reduce(updateStep, [model, Cmd.none])(msgs)
  const cmdsAndModel = messages.signal.startWith(config.init).scan(flip(update)).publishReplay().refCount()
  const model = map(nth(0))(cmdsAndModel)
  const subscriptions = map(config.subscriptions)(model)
  const html = map(curry(config.view)(address))(model)
  const subs = subscriptions.flatMap((sub) => Sub.toTask(address, sub))
  const tasks = cmdsAndModel.flatMap(([_, cmd]) => Cmd.toTask(address, cmd))

  return {
    model,
    html,
    subs,
    tasks,
  }
}

export const runApp = (app) => O.merge(app.model, app.html, app.tasks, app.subs).subscribe()
