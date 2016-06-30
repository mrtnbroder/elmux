
import React, { Component, PropTypes as PT } from 'react'
import { connect } from './connect.jsx'
import { Action } from '../randomGif'

class App extends Component {

  render() {
    const { topic, url, address } = this.props
    console.log('render', this.props)
    return (
      <div>
        <button onClick={() => address(Action.requestMore())}>Next</button>
        <input value={topic} onChange={({ target: { value }}) => address(Action.changeTopic(value))} type="text"/>
        <img src={url} alt=""/>
      </div>
    )
  }
}

export default connect()(App)
