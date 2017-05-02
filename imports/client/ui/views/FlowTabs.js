import React from 'react'
import { Menu } from 'semantic-ui-react'
import { compose, withProps } from 'recompose'
import { withRouter, Link } from 'react-router-dom'

const navs = [
  {name: '流程定义', key: 'definition'},
  {name: '流程实例', key: 'instances'},
  {name: '数据管理', key: 'data'},
  {name: '流程应用', key: 'applications'},
]

const FlowTabs = compose(
  withRouter,
  withProps(({match}) => ({
    flowId: match.params.flowId,
    currentUrl: match.url,
  })),
  withProps(({flowId}) => ({
    navs: navs.map(nav => ({
        ...nav,
        path: `/flow/${flowId}/${nav.key}`
      }
    ))
  }))
)(({navs, currentUrl}) => (
  <Menu tabular size="huge" style={{justifyContent: 'center', margin: 0}}>
    {
      navs.map(nav => {
        if (nav.path === currentUrl) {
          return <Menu.Item key={nav.key} name={nav.name} active/>
        } else {
          return <Menu.Item key={nav.key} name={nav.name} as={Link} to={nav.path}/>
        }
      })
    }
  </Menu>
))

export default FlowTabs