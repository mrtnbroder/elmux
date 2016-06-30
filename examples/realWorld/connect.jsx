
import React, { createElement, Component, PropTypes as PT } from 'react'
import hoistStatics from 'hoist-non-react-statics'
import { runApp, Signal } from '../../src'

const defaultMapStateToProps = (state = {}) => state // eslint-disable-line no-unused-vars
const defaultMapDispatchToProps = address => ({ address })
const defaultMergeProps = (stateProps, dispatchProps, parentProps) => ({
  ...parentProps,
  ...stateProps,
  ...dispatchProps
})

const getDisplayName = (WrappedComponent) => WrappedComponent.displayName || WrappedComponent.name || 'Component'

export const connect = (mapStateToProps = defaultMapStateToProps, mapDispatchToProps = defaultMapDispatchToProps) => {

  return (WrappedComponent) => {
    const connectDisplayName = `Connect(${getDisplayName(WrappedComponent)})`

    class Connect extends Component {

      static displayName = connectDisplayName

      static contextTypes = {
        store: PT.object
      }

      static propTypes = {
        store: PT.object
      }

      constructor(props, context) {
        super(props, context)

        this.store = props.store || context.store
        this.state = mapStateToProps(this.store.initalState)
        this.mergedProps = defaultMergeProps(this.state, mapDispatchToProps(this.store.address), props)
      }

      componentDidMount() {
        this.trySubscribe()
      }

      componentWillUpdate(nextProps, nextState) {
        this.mergedProps = defaultMergeProps(nextState, mapDispatchToProps(this.store.address), nextProps)
      }

      componentWillUnmount() {
        this.unsubscribe()
      }

      trySubscribe() {
        this.unsubscribe = Signal.merge(this.store.model, this.store.tasks).subscribe((storeState) => this.setState(storeState))
      }

      render() {
        return (
          createElement(WrappedComponent, this.mergedProps)
        )
      }

    }

    return hoistStatics(Connect, WrappedComponent)
  }
}

export default connect
