import React from 'react'
import { Icon } from 'semantic-ui-react'
import { compose, setPropTypes } from 'recompose'
import PropTypes from 'prop-types'

import FlowSettingsModal from './FlowSettingsModal'
import withToggleState from '../hocs/with_toggle_state'

const FlowBarButtons = compose(
  setPropTypes({
    flowId: PropTypes.string
  }),
)(({flowId}) => (
  <div style={{height: '100%', display: 'flex', alignItems: 'center'}}>
    <IconButton name="mail outline"/>
    <SettingsButton flowId={flowId}/>
  </div>
))

export default FlowBarButtons

const IconButton = ({name, onClick}) => (
  <div onClick={onClick}
       style={{height: '100%', padding: '0 0.5rem', display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
    <Icon name={name} size="big" style={{margin: 0}}/>
  </div>
)

const SettingsButton = compose(
  setPropTypes({
    flowId: PropTypes.string
  }),
  withToggleState('modalVisible', 'openModal', 'closeModal', false)
)(({flowId, modalVisible, openModal, closeModal}) => (
  <FlowSettingsModal trigger={<IconButton name="setting"/>} open={modalVisible} onOpen={openModal}
                     onClose={closeModal} flowId={flowId}/>
))