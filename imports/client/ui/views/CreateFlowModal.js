import React from 'react'
import { Form } from 'semantic-ui-react'
import { setPropTypes, compose, withState, withHandlers, lifecycle } from 'recompose'
import { assoc, trim } from 'lodash/fp'
import PropTypes from 'prop-types'
import Alert from 'react-s-alert'
import { Meteor } from 'meteor/meteor'

import FormModal from './FormModal'
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
  withHandlers({
    submit: ({flow, onClose}) => async () => {
      flow = {
        name: trim(flow.name),
        description: trim(flow.description)
      }

      if (!flow.name) {
        return Alert.error('请如输入流程名称')
      }

      try {
        await Meteor.async.call('Flow.createFlow', flow)
      } catch (err) {
        console.error(err)
        Alert.error('流程创建失败')
        return
      }
      Alert.success('流程创建成功')
      onClose()
    }
  }),
)(({trigger, open, onOpen, onClose, flow, onNameChange, onDescriptionChange, submit}) => (
  <FormModal open={open} trigger={trigger} onOpen={onOpen} onClose={onClose} submit={submit} header="创建流程">
    <Form.Input autoFocus required label="流程名称" value={flow.name} onChange={onNameChange}/>
    <Form.TextArea autoHeight label="流程描述" value={flow.description} onChange={onDescriptionChange}/>
  </FormModal>
))
