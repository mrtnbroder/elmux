
/**
 *  Start-App.js
 */

import { Observable } from 'rxjs'
import * as Signal from './Signal'
import * as Effects from './Effects'
import { reduce, map, flip, nth, curry } from 'ramda'

export const StartApp = (config) => {
  const messages = Signal.Mailbox([])
  const singleton = (action) => [action]
  const address = Signal.forwardTo(messages.address, singleton)
  const updateStep = ([oldModel, accumulatedEffects], action) => {
    const [newModel, additionalEffects] = config.update(action, oldModel)

    return [newModel, Effects.batch(accumulatedEffects, additionalEffects)]
  }
  const update = (actions, [model]) => reduce(updateStep, [model, Effects.none()], actions)
  const inputs = Observable.merge(messages.signal, map((signal) => map(singleton, signal), config.inputs))
  const effectsAndModel = inputs.startWith(config.init).scan(flip(update)).publishReplay().refCount()
  const model = effectsAndModel.map(nth(0))
  const tasks = effectsAndModel.flatMap(([_, effect]) => Effects.toTask(address, effect))

  return {
    model,
    tasks,
    address,
    initalState: nth(0)(config.init)
  }
}

export const runApp = (app) => Observable.merge(app.model, app.tasks).subscribe()
