
import React from 'react'
import { Signal, Cmd } from 'elmux'
import * as randomGif from '../randomGif/randomGif'

// -- TYPES

const LEFT = 'LEFT'
const RIGHT = 'RIGHT'

// -- MESSAGES

const Msg = {
  left: (msg) => ({ type: LEFT, payload: { msg } }),
  right: (msg) => ({ type: RIGHT, payload: { msg } }),
}

// -- INIT

export const init = (leftTopic, rightTopic) => {
  const [left, leftFx] = randomGif.init(leftTopic)
  const [right, rightFx] = randomGif.init(rightTopic)

  return [
    { left, right },
    Cmd.batch([
      Cmd.map(Msg.left, leftFx),
      Cmd.map(Msg.right, rightFx)
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

export const update = (msg, model) => {
  switch (msg.type) {
    case LEFT:
      const [left, leftFx] = randomGif.update(msg.payload.msg, model.left)
      return [{ ...model, left }, Cmd.map(Msg.left, leftFx)]
    case RIGHT:
      const [right, rightFx] = randomGif.update(msg.payload.msg, model.right)
      return [{ ...model, right }, Cmd.map(Msg.right, rightFx)]
    default:
      return [model, Cmd.none]
  }
}
