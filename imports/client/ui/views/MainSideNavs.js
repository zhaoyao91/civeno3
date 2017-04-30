import React from 'react'
import { Menu } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom'
import { compose } from 'recompose'

const navs = [
  {name: '流程', path: '/flows'}
]

export default compose(
  withRouter,
)(({match}) => (
  <Menu vertical tabular style={{width: 'auto', height: '100%'}}>
    {
      navs.map((nav, index) => (
        <Menu.Item key={index} as={Link} to={nav.path} active={match.path === nav.path}>{nav.name}</Menu.Item>
      ))
    }
  </Menu>
))