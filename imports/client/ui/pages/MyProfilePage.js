import React from 'react'
import { Segment, Header, Form, } from 'semantic-ui-react'
import { compose, withProps, withHandlers, setPropTypes } from 'recompose'
import { Meteor } from 'meteor/meteor'
import { SubsCache } from 'meteor/ccorcos:subs-cache'
import { prop, trim } from 'lodash/fp'
import Alert from 'react-s-alert'
import PropTypes from 'prop-types'

import withCurrentUser from '../hocs/with_current_user'
import MainNavBarLayout from '../layouts/MainNavBarLayout'
import UserCenterLayout from '../layouts/UserCenterLayout'
import UserAvatar from '../views/UserAvatar'
import SavableInput from '../components/SavableInput'
import withToggleState from '../hocs/with_toggle_state'

const MyProfilePage = () => (
  <MainNavBarLayout>
    <UserCenterLayout>
      <Main/>
    </UserCenterLayout>
  </MainNavBarLayout>
)

export default MyProfilePage

const Main = compose(
  withCurrentUser('user'),
  withProps(({user}) => ({
    userId: prop('_id', user),
    name: prop('profile.name', user)
  }))
)(({userId, name}) => (
  <Segment style={{margin: 0}}>
    <Header>个人信息</Header>
    <div style={{marginBottom: '1rem'}}><MyAvatar name={name}/></div>
    <MyProfileName userId={userId} name={name}/>
  </Segment>
))

const MyAvatar = ({name}) => (
  <Form>
    <Form.Field>
      <label>头像</label>
      <UserAvatar size={150} name={name}/>
    </Form.Field>
  </Form>
)

const MyProfileName = compose(
  setPropTypes({
    userId: PropTypes.string,
    name: PropTypes.string,
  }),
  withToggleState('saving', 'startSaving', 'finishSaving', false),
  withHandlers({
    save: ({startSaving, finishSaving, userId}) => (name, refresh) => {
      name = trim(name)

      if (!name) {
        return Alert.error('姓名不能为空')
      }

      startSaving()
      Meteor.call('User.updateProfileName', userId, name, (err) => {
        finishSaving()
        if (err) {
          console.error(err)
          Alert.error('姓名修改失败')
        } else {
          Alert.success('姓名修改成功')
          refresh(name)
        }
      })
    }
  })
)(({name, saving, save}) => (
  <SavableInput save={save} label="姓名" value={name} saving={saving} required/>
))
