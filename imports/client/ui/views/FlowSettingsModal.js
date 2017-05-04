import React from 'react'
import { Modal, Loader, TextArea } from 'semantic-ui-react'
import { setPropTypes, compose, branch, renderComponent, renderNothing, withHandlers } from 'recompose'
import { Meteor } from 'meteor/meteor'
import { prop } from 'lodash/fp'
import PropTypes from 'prop-types'

import withToggleState from '../hocs/with_toggle_state'
import withMeteorData from '../hocs/with_meteor_data'
import Flows from '../../collections/flows'
import SavableInput from '../components/SavableInput'

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
      <FlowSettings flowId={flowId}/>
    </Modal.Content>
  </Modal>
))

export default FlowSettingsModal

const FlowSettings = compose(
  setPropTypes({
    flowId: PropTypes.string,
  }),
  withMeteorData(({flowId}) => ({dataReady: Meteor.subscribe('Flow.flowOfId', flowId).ready()})),
  withMeteorData(({dataReady, flowId}) => ({flow: dataReady ? Flows.findOne(flowId) : null})),
  branch(({dataReady}) => !dataReady, renderComponent(() => <Loader/>)),
  branch(({flow}) => !flow, renderNothing)
)
(({dataReady, flow}) => (
  <div>
    <FlowNameInput flowId={prop('_id', flow)} flowName={prop('name', flow)}/>
  </div>
))

const FlowNameInput = compose(
  setPropTypes({
    flowId: PropTypes.string,
    flowName: PropTypes.string,
  }),
  withToggleState('saving', 'startSaving', 'finishSaving', false),
  withHandlers({
    save: ({flowId, startSaving, finishSaving}) => name => {
      console.log('new flow name: ', name)
      startSaving()
      setTimeout(() => {
        console.log('finished')
        finishSaving()
      }, 1000)
    }
  })
)(({flowName, save, saving}) => (
  <SavableInput label="流程名称" value={flowName} save={save} saving={saving}/>
))