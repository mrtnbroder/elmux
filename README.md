# Elmux

Elmux brings the Elm architecture to JS

## Example

```js
import { program, beginnerProgram } from 'elmux'
import { render } from 'react-dom' // or any other virtual dom library of your choice
import { view, update, init } from './examples/randomGifPair'

const root = document.querySelector('#root')
const renderNext = (html) => render(html, root)

const { model, html, tasks } = program({
  init: init('dogs', 'cats'),
  view,
  update,
  subscriptions: []
})

beginnerProgram({
  model,
  html: html.do(renderNext),
  tasks
})

```

## Examples

Run the examples via

```sh
npm run examples
```

and follow the given instructions.