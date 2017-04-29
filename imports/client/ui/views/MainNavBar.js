import React from 'react'
import { Dropdown, Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { Meteor } from 'meteor/meteor'
import { prop } from 'lodash/fp'
import { compose, withHandlers, withProps } from 'recompose'

import withMeteorData from '../hocs/with_meteor_data'

const MainNavBar = () => (
  <Menu borderless>
    <Menu.Item as={Link} to="/">
      CIVENO
    </Menu.Item>
    <Menu.Menu position="right">
      <AccountItem/>
    </Menu.Menu>
  </Menu>
)

export default MainNavBar

const AccountItem = compose(
  withMeteorData(() => ({user: Meteor.user()}))
)(({user}) => {
  if (!user) return <LoginItem/>
  else return <UserItem user={user}/>
})

const LoginItem = () => (
  <Menu.Item as={Link} to="/login">
    登录/注册
  </Menu.Item>
)

const UserItem = compose(
  withProps(({user}) => ({
    email: prop('emails.0.address')(user)
  })),
  withHandlers({
    onClickLogout: (props) => () => Meteor.logout()
  })
)(({email, onClickLogout}) => (
  <Dropdown item text={email}>
    <Dropdown.Menu>
      <Dropdown.Item onClick={onClickLogout}>
        <span style={{color: 'red'}}>退出登录</span>
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
))