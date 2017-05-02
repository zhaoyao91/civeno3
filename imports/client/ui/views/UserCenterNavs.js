import React from 'react'
import { Menu } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom'
import { compose } from 'recompose'

const navs = [
  {name: '个人信息', path: '/my/profile'},
  {name: '账号密码', path: '/my/account'},
]

const UserCenterNavs = compose(
  withRouter,
)(({match}) => (
  <Menu vertical style={{width: '100%'}}>
    {
      navs.map((nav, index) => (
        <Menu.Item key={index} as={Link} to={nav.path} active={match.path === nav.path}>
          {nav.name}
        </Menu.Item>
      ))
    }
  </Menu>
))

export default UserCenterNavs