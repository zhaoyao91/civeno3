import React from 'react'
import { Modal, TextArea } from 'semantic-ui-react'
import { setPropTypes, compose, branch, withProps, renderNothing, withHandlers } from 'recompose'
import { Meteor } from 'meteor/meteor'
import { prop, trim } from 'lodash/fp'
import PropTypes from 'prop-types'
import Alert from 'react-s-alert'

import withToggleState from '../hocs/with_toggle_state'
import withMeteorData from '../hocs/with_meteor_data'
import Flows from '../../collections/flows'
import SavableInput from '../components/SavableInput'
import renderLoader from '../hocs/render_loader'

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
  branch(({dataReady}) => !dataReady, renderLoader),
  branch(({flow}) => !flow, renderNothing),
  withProps(({flow}) => ({
    name: prop('name', flow),
    description: prop('description', flow)
  })),
)
(({dataReady, flowId, name, description}) => (
  <div>
    <FlowNameInput flowId={flowId} flowName={name}/>
    <div style={{height: '1rem'}}/>
    <FlowDescriptionInput flowId={flowId} flowDescription={description}/>
  </div>
))

const FlowNameInput = compose(
  setPropTypes({
    flowId: PropTypes.string,
    flowName: PropTypes.string,
  }),
  withHandlers({
    save: ({flowId}) => async name => {
      name = trim(name)

      if (!name) {
        return Alert.error('流程名称不能为空')
      }

      try {
        await Meteor.async.call('Flow.updateFlowName', flowId, name)
      } catch (err) {
        console.error(err)
        Alert.error('流程名称更新失败')
        return
      }
      Alert.success('流程名称更新成功')
      return {syncValue: name}
    }
  })
)(({flowName, save}) => (
  <SavableInput required label="流程名称" value={flowName} save={save}/>
))

const FlowDescriptionInput = compose(
  setPropTypes({
    flowId: PropTypes.string,
    flowDescription: PropTypes.string,
  }),
  withHandlers({
    save: ({flowId}) => async description => {
      console.log(description)
    }
  })
)(({flowDescription, save}) => (
  <SavableInput as={TextArea} controlProps={{autoHeight: true}} label="流程描述" value={flowDescription} save={save}/>
))