
import React from 'react'
import { Observable } from 'rxjs'
import * as Signal from '../../src/Signal'
import * as Effects from '../../src/Effects'
import * as randomGif from '../randomGif'

const LEFT = 'LEFT'
const RIGHT = 'RIGHT'

const Action = {
  left: (action) => ({ type: LEFT, payload: { action } }),
  right: (action) => ({ type: RIGHT, payload: { action } }),
}

export const init = (leftTopic, rightTopic) => {
  const [left, leftFx] = randomGif.init(leftTopic)
  const [right, rightFx] = randomGif.init(rightTopic)

  return [
    { left, right },
    Effects.batch(
      Effects.map(Action.left, leftFx),
      Effects.map(Action.right, rightFx)
    )
  ]
}

export const view = (address, model) => {
  return <div>
    {randomGif.view(Signal.forwardTo(address, Action.left), model.left)}
    {randomGif.view(Signal.forwardTo(address, Action.right), model.right)}
  </div>
}

export const update = (action, model) => {
  switch (action.type) {
    case LEFT:
      const [left, leftFx] = randomGif.update(action.payload.action, model.left)
      return [{ ...model, left }, Effects.map(Action.left, leftFx)]
      break;
    case RIGHT:
      const [right, rightFx] = randomGif.update(action.payload.action, model.right)
      return [{ ...model, right }, Effects.map(Action.right, rightFx)]
      break;
    default:
      return [model, Effects.none()]
  }
}
