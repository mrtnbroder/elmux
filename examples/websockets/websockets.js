
import React from 'react'
import { Observable as O } from 'rxjs'
import { Sub, Signal, Cmd, Task } from 'elmux'

// -- TYPES

const SEND = 'SEND'
const NEW_MESSAGE = 'NEW_MESSAGE'
const NEW_INPUT = 'NEW_INPUT'

// -- MESSAGES

export const Msg = {
  send: () => ({ type: SEND }),
  input: (value) => ({ type: NEW_INPUT, payload: { value } }),
  newMessage: (str) => ({ type: NEW_MESSAGE, payload: { str } }),
}

// -- INIT

export const init = () => [{ input: '', messages: [] }, Cmd.none]

// -- VIEW

export const view = (address, model) => {
  return (
    <div>
      <ul>
        {model.messages.map((msg, i) => <li key={i}>{msg}</li>)}
      </ul>
      <input value={model.input} type='text' onInput={(e) => address(Msg.input(e.target.value))}/>
      <button onClick={() => address(Msg.send())}>Send</button>
    </div>
  )
}

// -- UPDATE
const socket = new WebSocket('ws://echo.websocket.org')

export const update = (msg, model) => {
  switch (msg.type) {
    case NEW_MESSAGE:
      return [{ ...model, messages: model.messages.concat(msg.payload.str)}, Cmd.none]
    case NEW_INPUT:
      return [{ ...model, input: msg.payload.value }, Cmd.none]
    case SEND:
      send(socket, model.input)
      return [{ ...model, input: '' }, Cmd.none]
    default:
      return [model, Cmd.none]
  }
}

// -- SUBSCRIPTIONS

const send = (websocket, str) => websocket.send(str)
const listen = (websocket, tag) => O.create((observer) => {
  websocket.onmessage = (e) => {
    return observer.next(tag(e.data))
  }
})

export const subscriptions = (model) => {
  console.log('model', model);
  return listen(socket, Msg.newMessage)
}
