
import { render } from 'react-dom'
import { beginnerProgram, program } from 'elmux'
import { view, update, init } from './randomGifPair'

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
