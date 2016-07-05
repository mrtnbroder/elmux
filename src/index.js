
export * as Signal from './Signal'
export * as Cmds from './Cmds'
export * as Task from './Task'
export * from './Start-App'

//
// import * as Signal from './Signal'
// import { render } from 'react-dom'
// import { runApp, StartApp } from './Start-App'
// import { view, update, init } from '../examples/randomGifPair'
//
// const root = document.querySelector('#root')
// const renderNext = (html) => render(html, root)
//
// const main = () => {
//   const { model, html, tasks } = StartApp({
//     init: init('dogs', 'cats'),
//     view,
//     update,
//     inputs: []
//   })
//
//   runApp({
//     model,
//     html,
//     tasks: Signal.merge(
//       tasks,
//       html.do(renderNext)
//     )
//   })
// }
//
// main()
