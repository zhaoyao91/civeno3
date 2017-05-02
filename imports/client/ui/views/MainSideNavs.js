import React from 'react'
import { Menu } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom'
import { compose } from 'recompose'

const navs = [
  {name: '流程', path: '/flows'},
  {name: '工作台', path: '/workspace'},
]

const MainSideNavs = compose(
  withRouter,
)(({match}) => (
  <Menu vertical style={{width: 'auto', height: '100%'}}>
    {
      navs.map((nav, index) => (
        <Menu.Item key={index} as={Link} to={nav.path} active={match.path === nav.path}
                   style={{fontSize: '1.5rem', fontWeight: 'normal', textAlignLast: 'justify'}}>
          {nav.name}
        </Menu.Item>
      ))
    }
  </Menu>
))

export default MainSideNavs