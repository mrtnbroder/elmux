
import { render } from 'react-dom'
import { runApp, program } from 'elmux'
import { view, update, init } from './randomGifPair'

const root = document.querySelector('#root')
const renderNext = (html) => render(html, root)

const { model, html, tasks, subs } = program({
  init: init('dogs', 'cats'),
  view,
  update,
})

runApp({
  model,
  html: html.do(renderNext),
  tasks,
  subs
})
