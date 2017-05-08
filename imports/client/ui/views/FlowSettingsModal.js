import React from 'react'
import { Modal, TextArea, Form, Button } from 'semantic-ui-react'
import { setPropTypes, compose, branch, withProps, renderNothing, withHandlers } from 'recompose'
import { Meteor } from 'meteor/meteor'
import { prop, trim } from 'lodash/fp'
import PropTypes from 'prop-types'
import Alert from 'react-s-alert'

import UserAvatar from '../views/UserAvatar'
import withMeteorData from '../hocs/with_meteor_data'
import Flows from '../../collections/flows'
import SavableInputField from '../components/SavableInputField'
import renderLoader from '../hocs/render_loader'
import FlowUserRelations from '../../collections/flow_user_relations'
import Users from '../../collections/users'
import SearchUserByEmailModal from './SearchUserByEmailModal'
import withToggleState from '../hocs/with_toggle_state'

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
  branch(({dataReady}) => !dataReady, renderLoader),
  withMeteorData(({flowId}) => ({flow: Flows.findOne(flowId)})),
  branch(({flow}) => !flow, renderNothing),
  withProps(({flow}) => ({
    name: prop('name', flow),
    description: prop('description', flow)
  })),
)
(({dataReady, flowId, name, description}) => (
  <div>
    <div style={{marginBottom: '1rem'}}><FlowNameInput flowId={flowId} flowName={name}/></div>
    <div style={{marginBottom: '1rem'}}><FlowDescriptionInput flowId={flowId} flowDescription={description}/></div>
    <div style={{marginBottom: '1rem'}}><FlowOwnerInput flowId={flowId}/></div>
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
  <SavableInputField required label="流程名称" value={flowName} save={save}/>
))

const FlowDescriptionInput = compose(
  setPropTypes({
    flowId: PropTypes.string,
    flowDescription: PropTypes.string,
  }),
  withHandlers({
    save: ({flowId}) => async description => {
      description = trim(description)

      try {
        await Meteor.async.call('Flow.updateFlowDescription', flowId, description)
      } catch (err) {
        console.error(err)
        Alert.error('流程描述更新失败')
        return
      }
      Alert.success('流程描述更新成功')
      return {syncValue: description}
    }
  })
)(({flowDescription, save}) => (
  <SavableInputField as={TextArea} controlProps={{autoHeight: true}} label="流程描述" value={flowDescription} save={save}/>
))

const FlowOwnerInput = compose(
  setPropTypes({
    flowId: PropTypes.string,
  }),
  withMeteorData(({flowId}) => ({dataReady: Meteor.subscribe('Flow.ownersOfFlow', flowId).ready()})),
  branch(({dataReady}) => !dataReady, renderLoader),
  withMeteorData(({flowId}) => {
    const userIds = FlowUserRelations.find({type: 'owner', flowId: flowId}).map(prop('userId'))
    return {
      owners: Users.find({_id: {$in: userIds}}).fetch()
    }
  })
)(({flowId, owners}) => (
  <Form>
    <Form.Field>
      <label>流程管理员</label>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div>
          {
            owners.map(owner => (
              <div key={owner._id} style={{marginRight: '1rem'}}><FlowOwnerAvatar user={owner}/></div>
            ))
          }
        </div>
        <div><TransferFlowButton flowId={flowId}/></div>
      </div>
    </Form.Field>
  </Form>
))

const FlowOwnerAvatar = ({user}) => (
  <UserAvatar name={prop('profile.name', user)} size={50}/>
)

const TransferFlowButton = compose(
  withToggleState('modalVisible', 'openModal', 'closeModal', false),
  withHandlers({
    submit: ({flowId, closeModal}) => async user => {
      const confirmed = confirm('确定要移交流程？')
      if (!confirmed) return

      try {
        await Meteor.async.call('Flow.transferFlow', flowId, prop('_id', user))
      } catch (err) {
        console.error(err)
        if (err.error === 'no-permission.not-authorized') {
          Alert.error('没有权限')
        } else {
          Alert.error('流程移交失败')
        }
        return
      }
      Alert.success('流程移交成功')
      closeModal()
    }
  })
)(({flowId, modalVisible, openModal, closeModal, submit}) => (
  <SearchUserByEmailModal open={modalVisible} onOpen={openModal} onClose={closeModal} header="移交流程" submit={submit}
                          trigger={<Button type="button" primary>移交</Button>}/>
))