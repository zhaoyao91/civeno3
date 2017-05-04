import React from 'react'
import { Form } from 'semantic-ui-react'
import { setPropTypes, compose, withState, withHandlers, lifecycle } from 'recompose'
import { assoc } from 'lodash/fp'
import PropTypes from 'prop-types'
import Alert from 'react-s-alert'
import { Meteor } from 'meteor/meteor'

import FormModal from './FormModal'
import withToggleState from '../hocs/with_toggle_state'
import onToggle from '../hocs/on_toggle'

const emptyFlow = {name: '', description: ''}

export default compose(
  setPropTypes({
    trigger: PropTypes.element,
    open: PropTypes.bool,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
  }),
  withState('flow', 'setFlow', emptyFlow),
  withHandlers({
    onNameChange: ({setFlow}) => e => setFlow(assoc('name', e.target.value)),
    onDescriptionChange: ({setFlow}) => e => setFlow(assoc('description', e.target.value)),
    resetFlow: ({setFlow}) => () => setFlow(emptyFlow)
  }),
  onToggle('open', ({resetFlow}) => resetFlow()),
  withToggleState('submitting', 'startSubmit', 'finishSubmit', false),
  withHandlers({
    submit: ({flow, startSubmit, finishSubmit, onClose}) => () => {
      if (!flow.name) {
        return Alert.error('请如输入流程名称')
      }

      startSubmit()
      Meteor.call('Flow.createFlow', flow, (err, flowId) => {
        finishSubmit()
        if (err) {
          console.error(err)
          Alert.error('流程创建失败')
        } else {
          Alert.success('流程创建成功')
          onClose()
        }
      })
    }
  }),
)(({trigger, open, onOpen, onClose, flow, onNameChange, onDescriptionChange, submit, submitting}) => (
  <FormModal open={open} trigger={trigger} onOpen={onOpen} onClose={onClose} submit={submit} submitting={submitting}
             header="创建流程">
    <Form.Input autoFocus required label="流程名称" value={flow.name} onChange={onNameChange}/>
    <Form.TextArea autoHeight label="流程描述" value={flow.description} onChange={onDescriptionChange}/>
  </FormModal>
))
