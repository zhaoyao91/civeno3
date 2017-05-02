import React from 'react'
import { Dropdown, Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { Meteor } from 'meteor/meteor'
import { prop } from 'lodash/fp'
import { compose, withHandlers, withProps } from 'recompose'

import withCurrentUserId from '../hocs/with_current_user_id'
import withCurrentUser from '../hocs/with_current_user'

const MainNavBar = () => (
  <Menu borderless>
    <Menu.Item as={Link} to="/" style={{fontSize: '1.5rem'}}>
      CIVENO
    </Menu.Item>
    <Menu.Menu position="right">
      <AccountItem/>
    </Menu.Menu>
  </Menu>
)

export default MainNavBar

const AccountItem = compose(
  withCurrentUserId
)(({userId}) => {
  if (userId) {
    return <UserItem/>
  } else {
    return <LoginItem/>
  }
})

const LoginItem = () => (
  <Menu.Item as={Link} to="/login">
    登录/注册
  </Menu.Item>
)

const UserItem = compose(
  withCurrentUser,
  withProps(({user}) => ({
    name: prop('profile.name', user) || prop('emails.0.address', user)
  })),
  withHandlers({
    onClickLogout: (props) => () => Meteor.logout()
  })
)(({name, onClickLogout}) => (
  <Dropdown item text={name} floating>
    <Dropdown.Menu>
      <Dropdown.Item as={Link} to="/user-center">
        个人中心
      </Dropdown.Item>
      <Dropdown.Item onClick={onClickLogout}>
        <span style={{color: 'red'}}>退出登录</span>
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
))