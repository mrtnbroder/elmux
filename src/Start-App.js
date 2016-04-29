
/**
 *  Start-App.js
 */

import { render } from 'react-dom'
import most from 'most'
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
  // const inputs = most.merge(messages.signal, map((signal) => map(singleton, signal), config.inputs))
  const effectsAndModel = messages.stream.scan(flip(update), config.init).multicast()
  const model = effectsAndModel.map(nth(0))
  const html = model.map(curry(config.view)(address))
  const tasks = effectsAndModel.flatMap(([_, effect]) => Effects.toTask(address, effect))

  return {
    model,
    html,
    tasks: most.merge(
      tasks,
      html.tap(renderNext)
    )
  }
}

const root = document.querySelector('#root')
const renderNext = (html) => render(html, root)

export const runApp = (app) => most.merge(app.model, app.html, app.tasks).drain()
