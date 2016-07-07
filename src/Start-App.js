
/**
 *  Start-App.js
 */

import { Observable } from 'rxjs'
import * as Signal from './Signal'
import * as Cmds from './Cmds'
import { reduce, map, flip, nth, curry } from 'ramda'

export const StartApp = (config) => {
  const messages = Signal.Mailbox([])
  const singleton = (action) => [action]
  const address = Signal.forwardTo(messages.address, singleton)
  const updateStep = ([oldModel, accumulatedCmds], action) => {
    const [newModel, additionalCmds] = config.update(action, oldModel)

    return [newModel, Cmds.batch([accumulatedCmds, additionalCmds])]
  }
  const update = (actions, [model]) => reduce(updateStep, [model, Cmds.none])(actions)
  const inputs = Observable.merge(messages.signal, map(singleton, config.inputs))
  const cmdsAndModel = inputs.startWith(config.init).scan(flip(update)).publishReplay().refCount()
  const model = cmdsAndModel.map(nth(0))
  const html = model.map(curry(config.view)(address))
  const tasks = cmdsAndModel.flatMap(([_, cmd]) => Cmds.toTask(address, cmd))

  return {
    model,
    html,
    tasks
  }
}

export const runApp = (app) => Observable.merge(app.model, app.html, app.tasks).subscribe()
