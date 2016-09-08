# Elmux

Elmux brings the Elm architecture to JS

## Example

```js
import { Signal, StartApp, runApp } from 'elmux'
import { render } from 'react-dom' // or any other virtual dom library of your choice
import { view, update, init } from './examples/randomGifPair'

const root = document.querySelector('#root')
const renderNext = (html) => render(html, root)

const { model, html, tasks } = StartApp({
  init: init('dogs', 'cats'),
  view,
  update,
  subscriptions: []
})

runApp({
  model,
  html,
  tasks: Signal.merge(
    tasks,
    html.do(renderNext)
  )
})

```
