
import React from 'react'
import * as Signal from '../../src/Signal'
import * as Cmds from '../../src/Cmds'
import * as randomGif from '../randomGif'

// -- TYPES

const LEFT = 'LEFT'
const RIGHT = 'RIGHT'

// -- MESSAGES

const Msg = {
  left: (action) => ({ type: LEFT, payload: { action } }),
  right: (action) => ({ type: RIGHT, payload: { action } }),
}

// -- INIT

export const init = (leftTopic, rightTopic) => {
  const [left, leftFx] = randomGif.init(leftTopic)
  const [right, rightFx] = randomGif.init(rightTopic)

  return [
    { left, right },
    Cmds.batch([
      Cmds.map(Msg.left, leftFx),
      Cmds.map(Msg.right, rightFx)
    ])
  ]
}

// -- VIEW

export const view = (address, model) => {
  return <div>
    {randomGif.view(Signal.forwardTo(address, Msg.left), model.left)}
    {randomGif.view(Signal.forwardTo(address, Msg.right), model.right)}
  </div>
}

// -- UPDATE

export const update = (action, model) => {
  switch (action.type) {
    case LEFT:
      const [left, leftFx] = randomGif.update(action.payload.action, model.left)
      return [{ ...model, left }, Cmds.map(Msg.left, leftFx)]
      break;
    case RIGHT:
      const [right, rightFx] = randomGif.update(action.payload.action, model.right)
      return [{ ...model, right }, Cmds.map(Msg.right, rightFx)]
      break;
    default:
      return [model, Cmds.none]
  }
}
