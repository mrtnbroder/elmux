
import React from 'react'
import { Observable } from 'rxjs'
import * as Cmd from '../../src/Cmd'
import * as Tasks from '../../src/Tasks'

// -- TYPES

const NEW_GIF = 'NEW_GIF'
const GIF_ERROR = 'GIF_ERROR'
const REQUEST_MORE = 'REQUEST_MORE'
const CHANGE_TOPIC = 'CHANGE_TOPIC'

// -- MESSAGES

export const Msg = {
  requestMore: () => ({ type: REQUEST_MORE }),
  changeTopic: (topic) => ({ type: CHANGE_TOPIC, payload: { topic } }),
  gifError: (url) => ({ type: GIF_ERROR, payload: { url } }),
  newGif: (url) => ({ type: NEW_GIF, payload: { url } }),
}

// -- INIT

export const init = (topic = 'dogs') => [
  { topic, url: 'waiting.gif' },
  getRandomGif(topic)
]

// -- VIEW

export const view = (address, model) => {
  return <div>
    <button onClick={() => address(Msg.requestMore())}>Next</button>
    <input value={model.topic} onChange={({ target: { value }}) => address(Msg.changeTopic(value))}/>
    <img src={model.url} alt=""/>
  </div>
}

// -- UPDATE

export const update = (msg, model) => {
  switch (msg.type) {
    case REQUEST_MORE:
      return [model, getRandomGif(model.topic)]
      break;
    case NEW_GIF:
      return [{ ...model, url: msg.payload.url }, Cmd.none]
      break;
    case CHANGE_TOPIC:
      return [{ ...model, topic: msg.payload.topic }, Cmd.none]
      break;
    case GIF_ERROR:
      return [{ ...model, url: msg.payload.url }, Cmd.none]
      break;
    default:
      return [model, Cmd.none]
  }
}

// -- COMMANDS

const getRandomGif = (topic) => Tasks.perform(
  Msg.gifError,
  Msg.newGif,
  Observable.fromPromise(
    fetch(`https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=${topic}`)
    .then((r) => r.json())
    .then((r) => r.data.image_url)
  )
)
