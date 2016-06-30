
import React from 'react'
import Provider from './Provider.jsx'
import { render } from 'react-dom'
import { StartApp, Effects } from '../../src'
import App from './App.jsx'
import { init, update, view } from '../randomGif'
// import { route as routes } from '../Application'
// import { Router, browserHistory } from 'react-router'

// const getReducersOfRoute

const main = () => {
  const store = StartApp({
    init: init('dogs'),
    update,
    inputs: []
  })
  const rootEl = document.getElementById('root')

  render(
    <Provider store={store}>
      <App/>
    </Provider>,
    rootEl
  )
}

main()
