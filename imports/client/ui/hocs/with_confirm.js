import React from 'react'
import { Confirm } from 'semantic-ui-react'
import { compose, withProps, withHandlers } from 'recompose'
import { pick, invoke } from 'lodash/fp'
import { ReactiveVar }from 'meteor/reactive-var'
import PropTypes from 'prop-types'

import defineComponent from './define_component'
import withMeteorData from './with_meteor_data'

/**
 * allow component to confirm sth to  user
 * @param confirmName
 * @param componentName
 * @returns HOC
 */
export default function (confirmName, componentName) {
  const open = new ReactiveVar(false)

  let request = null

  async function confirm () {
    return new Promise((resolve, reject) => {
      open.set(true)
      if (request) {
        request.cancelWithoutClose()
      }
      request = {
        confirm: () => {
          request = null
          open.set(false)
          resolve(true)
        },
        cancel: () => {
          request = null
          open.set(false)
          resolve(false)
        },
        cancelWithoutClose: () => {
          request = null
          resolve(false)
        },
      }
    })
  }

  const ConfirmController = compose(
    defineComponent('ConfirmController', {
      header: PropTypes.node,
      content: PropTypes.node,
      confirmButton: PropTypes.node,
      cancelButton: PropTypes.node,
    }),
    withMeteorData(() => ({open: open.get()})),
    withHandlers({
      onConfirm: () => () => invoke('confirm', request),
      onCancel: () => () => invoke('cancel', request),
    }),
  )(Confirm)

  return withProps({
    [confirmName]: confirm,
    [componentName]: ConfirmController
  })
}