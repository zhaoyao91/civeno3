import React from 'react'
import { Modal, Button, Form } from 'semantic-ui-react'
import { setPropTypes, compose, withState, withHandlers, lifecycle } from 'recompose'
import { assoc } from 'lodash/fp'
import PropTypes from 'prop-types'
import Alert from 'react-s-alert'
import { Meteor } from 'meteor/meteor'

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
  lifecycle({
    componentWillReceiveProps(nextProps) {
      if (this.props.open !== nextProps.open) {
        this.props.resetFlow()
      }
    }
  }),
  withState('submitting', 'setSubmitting', false),
  withHandlers({
    onCreateFlow: ({flow, setSubmitting, onClose}) => () => {
      if (!flow.name) {
        return Alert.error('请如输入流程名称')
      }

      setSubmitting(true)
      Meteor.call('Flow.createFlow', flow, (err, flowId) => {
        setSubmitting(false)
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
  withHandlers({
    onSubmit: ({onCreateFlow}) => e => {
      e.preventDefault()
      onCreateFlow()
    }
  })
)(({trigger, open, onOpen, onClose, flow, onNameChange, onDescriptionChange, onSubmit, onCreateFlow, submitting}) => (
  <Modal size="small" open={open} trigger={trigger} onOpen={onOpen} onClose={onClose} closeIcon='close'>
    <Modal.Header content='创建流程'/>
    <Modal.Content>
      <Form loading={submitting} onSubmit={onSubmit}>
        <Form.Input required label="流程名称" value={flow.name} onChange={onNameChange}/>
        <Form.TextArea autoHeight label="流程描述" value={flow.description} onChange={onDescriptionChange}/>
      </Form>
    </Modal.Content>
    <Modal.Actions>
      <Button onClick={onClose}>返回</Button>
      <Button primary onClick={onCreateFlow}>创建</Button>
    </Modal.Actions>
  </Modal>
))