import React from 'react'
import { Modal, Loader, Form } from 'semantic-ui-react'
import { setPropTypes, compose, branch, renderComponent, renderNothing } from 'recompose'
import PropTypes from 'prop-types'
import { Meteor } from 'meteor/meteor'
import { propOr } from 'lodash/fp'

import withMeteorData from '../hocs/with_meteor_data'
import Flows from '../../collections/flows'

const FlowSettingsModal = compose(
  setPropTypes({
    trigger: PropTypes.element,
    open: PropTypes.bool,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    flowId: PropTypes.string,
  }),
)(({trigger, open, onOpen, onClose, flowId}) => (
  <Modal size="small" open={open} trigger={trigger} onOpen={onOpen} onClose={onClose} closeIcon='close'>
    <Modal.Header content="流程设置"/>
    <Modal.Content>
      <FlowSettingsForm flowId={flowId}/>
    </Modal.Content>
  </Modal>
))

export default FlowSettingsModal

const FlowSettingsForm = compose(
  setPropTypes({
    flowId: PropTypes.string,
  }),
  withMeteorData(({flowId}) => ({dataReady: Meteor.subscribe('Flow.flowOfId', flowId).ready()})),
  withMeteorData(({dataReady, flowId}) => ({flow: dataReady ? Flows.findOne(flowId) : null})),
  branch(({dataReady}) => !dataReady, renderComponent(() => <Loader/>)),
  branch(({flow}) => !flow, renderNothing)
)
(({dataReady, flow}) => (
  <Form>
    <Form.Input label="流程名称" value={propOr('', 'name', flow)}/>
    <Form.TextArea autoHeight label="流程简介" value={propOr('', 'description', flow)}/>
  </Form>
))