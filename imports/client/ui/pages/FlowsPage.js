import React from 'react'
import { Card } from 'semantic-ui-react'
import { compose, withHandlers, setPropTypes, renderNothing, branch } from 'recompose'
import { Meteor } from 'meteor/meteor'
import { flatten, prop } from 'lodash/fp'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { SubsCache } from 'meteor/ccorcos:subs-cache'

import renderLoader from '../hocs/render_loader'
import withMeteorData from '../hocs/with_meteor_data'
import Flows from '../../collections/flows'
import FlowUserRelations from '../../collections/flow_user_relations'
import CreateFlowModal from '../views/CreateFlowModal'
import MainSideNavsLayout from '../layouts/MainSideNavsLayout'
import MainNavBarLayout from '../layouts/MainNavBarLayout'
import withToggleState from '../hocs/with_toggle_state'

const FlowsPage = () => (
  <MainNavBarLayout>
    <MainSideNavsLayout>
      <FlowsView/>
    </MainSideNavsLayout>
  </MainNavBarLayout>
)

export default FlowsPage

const CreateFlowCard = compose(
  withToggleState('modalVisible', 'openModal', 'closeModal', false),
)(({modalVisible, openModal, closeModal}) => (
  <Card style={{width: '100%', height: '100%'}} onClick={openModal}>
    <Card.Content style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <p style={{fontSize: '2rem', color: 'initial'}}>创建流程</p>
    </Card.Content>
    <CreateFlowModal open={modalVisible} onOpen={openModal} onClose={closeModal}/>
  </Card>
))

const FlowCard = compose(
  setPropTypes({
    flowId: PropTypes.string
  }),
  withMeteorData(({flowId}) => ({flow: Flows.findOne(flowId)})),
  withRouter,
  withHandlers({
    onClick: ({history, flowId}) => () => history.push(`/flow/${flowId}`)
  })
)(({flow, onClick}) => (
  <Card style={{width: '100%', height: '100%'}} onClick={onClick}>
    <Card.Content>
      <Card.Header>{prop('name', flow)}</Card.Header>
      <Card.Description>{prop('description', flow)}</Card.Description>
    </Card.Content>
  </Card>
))

const FlowsView = compose(
  withMeteorData(() => ({userId: Meteor.userId()})),
  branch(({userId}) => !userId, renderNothing),
  withMeteorData(({userId}) => ({subReady: Meteor.subscribe('Flow.flowsOfOwner', userId).ready()})),
  branch(({subReady}) => !subReady, renderLoader.strech),
  withMeteorData(({userId}) => ({flowIds: FlowUserRelations.find({type: 'owner', userId: userId}).map(prop('flowId'))}))
)(({flowIds}) => (
  <CardsLayout>
    {
      flatten([
        <CreateFlowCard key="0"/>,
        flowIds.map(flowId => (
          <FlowCard key={flowId} flowId={flowId}/>
        ))
      ])
    }
  </CardsLayout>
))

const CardsLayout = ({children}) => (
  <div style={{height: '100%', overflow: 'auto', padding: '2rem 0 0 2rem'}}>
    {
      children.map((card, index) => (
        <div key={index} style={{
          width: '228px',
          height: '128px',
          float: 'left',
          marginRight: '2rem',
          marginBottom: '2rem'
        }}>{card}</div>
      ))
    }
  </div>
)