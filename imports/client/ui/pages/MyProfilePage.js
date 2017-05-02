import React from 'react'
import { Segment, Header, Form, Button } from 'semantic-ui-react'
import { compose, withState, withProps, withHandlers } from 'recompose'
import { Meteor } from 'meteor/meteor'
import { SubsCache } from 'meteor/ccorcos:subs-cache'
import { prop, trim } from 'lodash/fp'
import Alert from 'react-s-alert'

import withCurrentUser from '../hocs/with_current_user'
import MainNavBarLayout from '../layouts/MainNavBarLayout'
import UserCenterLayout from '../layouts/UserCenterLayout'

const MyProfilePage = () => (
  <MainNavBarLayout>
    <UserCenterLayout>
      <Segment style={{margin: 0}}>
        <Header>个人信息</Header>
        <ProfileForm/>
      </Segment>
    </UserCenterLayout>
  </MainNavBarLayout>
)

export default MyProfilePage

const ProfileForm = compose(
  withCurrentUser,
  withProps(({user}) => ({profile: prop('profile', user)})),
  withState('name', 'setName', ({profile}) => prop('name', profile)),
  withProps(({profile, name}) => ({
    canSave: trim(prop('name', profile)) !== trim(name)
  })),
  withState('updating', 'setUpdating', false),
  withHandlers({
    onNameChange: ({setName}) => e => setName(e.target.value),
    onSubmit: ({setUpdating, user, name}) => e => {
      e.preventDefault()

      name = trim(name)

      if (!name) {
        return Alert.error('名字不能为空')
      }

      const newProfile = {name}
      setUpdating(true)
      Meteor.call('User.updateProfile', prop('_id', user), newProfile, (err) => {
        setUpdating(false)
        if (err) {
          console.error(err)
          Alert.error('个人信息更新失败')
        } else {
          Alert.success('个人信息更新成功')
        }
      })
    }
  }),
)(({updating, name, onNameChange, canSave, onSubmit}) => (
  <Form onSubmit={onSubmit} loading={updating}>
    <Form.Input label="姓名" value={name} onChange={onNameChange}/>
    <Button primary disabled={!canSave}>保存</Button>
  </Form>
))