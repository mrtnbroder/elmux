
import { render } from 'react-dom'
import { beginnerProgram, program } from 'elmux'
import { view, update, init, subscriptions } from './websockets'

const root = document.querySelector('#root')
const renderNext = (html) => render(html, root)

const { model, html, tasks, subs } = program({
  init: init(),
  view,
  update,
  subscriptions
})

beginnerProgram({
  model,
  html: html.do(renderNext),
  tasks,
  subs
})
