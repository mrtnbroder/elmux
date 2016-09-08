
/**
 *  Start-App.js
 */

import { Observable } from 'rxjs'
import * as Signal from './Signal'
import * as Cmd from './Cmd'
import * as Task from './Task'
import { reduce, map, flip, nth, curry } from 'ramda'

export const StartApp = (config) => {
  const messages = Signal.Mailbox([])
  const singleton = (msg) => [msg]
  const address = Signal.forwardTo(messages.address, singleton)
  const updateStep = ([oldModel, accumulatedCmds], msg) => {
    const [newModel, additionalCmds] = config.update(msg, oldModel)

    return [newModel, Cmd.batch([accumulatedCmds, additionalCmds])]
  }
  const update = (msgs, [model]) => reduce(updateStep, [model, Cmd.none])(msgs)
  const subscriptions = Observable.merge(messages.signal, map(singleton, config.subscriptions))
  const cmdsAndModel = subscriptions.startWith(config.init).scan(flip(update)).publishReplay().refCount()
  const model = cmdsAndModel.map(nth(0))
  const html = model.map(curry(config.view)(address))
  const tasks = cmdsAndModel.flatMap(([_, cmd]) => Task.toTask(address, cmd))

  return {
    model,
    html,
    tasks
  }
}

export const runApp = (app) => Observable.merge(app.model, app.html, app.tasks).subscribe()
