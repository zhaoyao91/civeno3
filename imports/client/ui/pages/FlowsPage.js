import React from 'react'
import { Card } from 'semantic-ui-react'
import { compose, withState, withHandlers, setPropTypes, setStatic } from 'recompose'
import { Meteor } from 'meteor/meteor'
import { flatten } from 'lodash/fp'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { SubsCache } from 'meteor/ccorcos:subs-cache'

import withMeteorData from '../hocs/with_meteor_data'
import Flows from '../../../common/collections/flows'
import CreateFlowModal from '../views/CreateFlowModal'
import MainSideNavsLayout from '../layouts/MainSideNavsLayout'
import MainNavBarLayout from '../layouts/MainNavBarLayout'

const FlowsPage = () => (
  <MainNavBarLayout>
    <MainSideNavsLayout>
      <FlowsView/>
    </MainSideNavsLayout>
  </MainNavBarLayout>
)

export default FlowsPage

const CardsLayout = ({children}) => (
  <div style={{height: '100%', overflow: 'auto', padding: '2rem 0 0 2rem'}}>
    {
      children.map((card, index) => (
        <div key={index} style={{float: 'left', marginRight: '2rem', marginBottom: '2rem'}}>{card}</div>
      ))
    }
  </div>
)

const CreateFlowCard = compose(
  withState('modalVisible', 'setModalVisible', false),
  withHandlers({
    openModal: ({setModalVisible}) => () => setModalVisible(true),
    closeModal: ({setModalVisible}) => () => setModalVisible(false),
  }),
)(({modalVisible, openModal, closeModal}) => (
  <Card style={{width: '300px', height: '170px'}} onClick={openModal}>
    <Card.Content style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <p style={{fontSize: '2rem', color: 'initial'}}>创建流程</p>
    </Card.Content>
    <CreateFlowModal open={modalVisible} onOpen={openModal} onClose={closeModal}/>
  </Card>
))

const FlowCard = compose(
  setPropTypes({
    flow: PropTypes.object
  }),
  withRouter,
  withHandlers({
    onClick: ({history, flow}) => () => history.push(`/flow/${flow._id}`)
  })
)(({flow, onClick}) => (
  <Card style={{width: '300px', height: '170px'}} onClick={onClick}>
    <Card.Content>
      <Card.Header>{flow.name}</Card.Header>
      <Card.Description>{flow.description}</Card.Description>
    </Card.Content>
  </Card>
))

const FlowsView = compose(
  setStatic('subsCache', new SubsCache()),
  withMeteorData(() => ({userId: Meteor.userId()})),
  withMeteorData(({userId}) => {
    const sub = FlowsView.subsCache.subscribe('Flow.flowsOfOwner', userId)
    return {
      dataReady: sub.ready()
    }
  }),
  withMeteorData(({userId, dataReady}) => {
    if (userId && dataReady) {
      return {
        flows: Flows.find({owner: userId}).fetch()
      }
    } else {
      return {
        flows: []
      }
    }
  })
)(({flows}) => (
  <CardsLayout>
    {
      flatten([
        <CreateFlowCard key="0"/>,
        flows.map(flow => (
          <FlowCard key={flow._id} flow={flow}/>
        ))
      ])
    }
  </CardsLayout>
))