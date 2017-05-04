import React from 'react'
import { lifecycle } from 'recompose'

/**
 * callback if the prop toggled
 * @param propName
 * @param callback(currentProps, nextProps)
 * @returns HOC
 */
export default function (propName, callback) {
  return lifecycle({
    componentWillReceiveProps(nextProps) {
      if (this.props[propName] !== nextProps[propName]) {
        callback(this.props, nextProps)
      }
    }
  })
}
