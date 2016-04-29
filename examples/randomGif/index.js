
import React from 'react'
import Perf from 'react/lib/ReactDefaultPerf'
import most from 'most'
import * as Effects from '../../src/Effects'

const NEW_GIF = 'NEW_GIF'
const GIF_ERROR = 'GIF_ERROR'
const REQUEST_MORE = 'REQUEST_MORE'
const CHANGE_TOPIC = 'CHANGE_TOPIC'

export const Action = {
  requestMore: () => ({ type: REQUEST_MORE }),
  changeTopic: (topic) => ({ type: CHANGE_TOPIC, payload: { topic } }),
  gifError: (url) => ({ type: GIF_ERROR, payload: { url } }),
  newGif: (url) => ({ type: NEW_GIF, payload: { url } }),
}

export const init = (topic) => [{ topic, url: 'waiting.gif' }, getRandomGif(topic)]

export const view = (address, model) => {
  return <div>
    <button onClick={() => address(Action.requestMore())}>Next</button>
    <input value={model.topic} onChange={({ target: { value }}) => address(Action.changeTopic(value))} type="text"/>
    <img src={model.url} alt=""/>
  </div>
}

export const update = (action, model) => {
  switch (action.type) {
    case REQUEST_MORE:
      return [model, getRandomGif(model.topic)]
      break;
    case NEW_GIF:
      return [{ ...model, url: action.payload.url }, Effects.none()]
      break;
    case CHANGE_TOPIC:
      return [{ ...model, topic: action.payload.topic }, Effects.none()]
      break;
    case GIF_ERROR:
      return [{ ...model, url: action.payload.url }, Effects.none()]
      break;
    default:
      return [model, Effects.none()]
  }
}

const getRandomGif = (topic) => Effects.fromTask(
  most.fromPromise(
    fetch(`https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=${topic}`)
      .then((r) => r.json())
      .then((r) => r.data.image_url)
  ),
  Action.newGif,
  Action.gifError
)

window.Perf = Perf
