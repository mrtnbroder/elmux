
import React, { Children, Component, PropTypes as PT } from 'react'

class Provider extends Component {

  getChildContext() {
    return { store: this.store }
  }

  constructor(props, context) {
    super(props, context)
    this.store = props.store
  }

  render() {
    return Children.only(this.props.children)
  }

}

Provider.propTypes = {
  store: PT.object.isRequired,
  children: PT.element.isRequired
}

Provider.childContextTypes = {
  store: PT.object.isRequired
}

export default Provider
