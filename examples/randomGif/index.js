
import { render } from 'react-dom'
import { runApp, program } from 'elmux'
import { view, update, init } from './randomGif'

const root = document.querySelector('#root')
const renderNext = (html) => render(html, root)

const { model, html, tasks, subs } = program({
  init: init('dogs'),
  view,
  update,
})

runApp({
  model,
  html: html.do(renderNext),
  tasks,
  subs,
})
