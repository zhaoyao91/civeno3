import React from 'react'

/**
 * offer a toggle state and functions to turn it on or off
 * @param stateName
 * @param onFuncName
 * @param offFuncName
 * @param initialState
 * @returns HOC
 */
export default function (stateName, onFuncName, offFuncName, initialState) {
  return function (Component) {
    return class WithToggleState extends React.Component {
      state = {
        stateValue: initialState
      }

      onFunc = () => {this.setState({stateValue: true})}
      offFunc = () => {this.setState({stateValue: false})}

      render () {
        return <Component {...this.props} {...{
          [stateName]: this.state.stateValue,
          [onFuncName]: this.onFunc,
          [offFuncName]: this.offFunc
        }}/>
      }
    }
  }
}