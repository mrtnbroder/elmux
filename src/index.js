
import { runApp, StartApp } from './Start-App'
import { view, update, init } from '../examples/randomGifPair'

runApp(StartApp({
  init: init('dogs', 'cats'),
  view,
  update,
  inputs: []
}))
