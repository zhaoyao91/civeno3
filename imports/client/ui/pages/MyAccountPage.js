import React from 'react'
import { Segment, Header, Form, Button } from 'semantic-ui-react'
import { compose, withState, withProps, withHandlers } from 'recompose'
import { SubsCache } from 'meteor/ccorcos:subs-cache'
import { prop, trim } from 'lodash/fp'

import withCurrentUser from '../hocs/with_current_user'
import MainNavBarLayout from '../layouts/MainNavBarLayout'
import UserCenterLayout from '../layouts/UserCenterLayout'
import ChangePasswordModal from '../views/ChangePasswordModal'
import withToggleState from '../hocs/with_toggle_state'

const MyAccountPage = () => (
  <MainNavBarLayout>
    <UserCenterLayout>
      <Segment style={{margin: 0}}>
        <Header>账号密码</Header>
        <div style={{marginBottom: '1rem'}}><MyEmail/></div>
        <MyPassword/>
      </Segment>
    </UserCenterLayout>
  </MainNavBarLayout>
)

export default MyAccountPage

const MyEmail = compose(
  withCurrentUser('user'),
  withProps(({user}) => ({email: prop('emails.0.address', user)}))
)(({email}) => (
  <Form>
    <Form.Field>
      <label>邮箱</label>
      <input value={email} readOnly/>
    </Form.Field>
  </Form>
))

const MyPassword = compose()(() => (
  <Form>
    <Form.Field>
      <label>密码</label>
      <ChangePasswordButton/>
    </Form.Field>
  </Form>
))

const ChangePasswordButton = compose(
  withToggleState('modalVisible', 'openModal', 'closeModal', false),
)(({modalVisible, openModal, closeModal}) => (
  <ChangePasswordModal open={modalVisible} onOpen={openModal} onClose={closeModal}
                       trigger={<Button primary type="button">修改密码</Button>}/>
))