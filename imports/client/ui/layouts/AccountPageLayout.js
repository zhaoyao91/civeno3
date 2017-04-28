import React from 'react'
import { Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { last } from 'lodash/fp'
import { compose, withProps } from 'recompose'

const AccountPageLayout = ({children}) => (
  <div>
    <div style={{position: 'absolute', right: '1em', top: '1em'}}>
      <TopLinks/>
    </div>
    <div style={{minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <div>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <Header size="huge" style={{marginBottom: '1em'}}>CIVENO 会米</Header>
        </div>
        <div>{children}</div>
      </div>
    </div>
  </div>
)

export default AccountPageLayout

const TopLinks = compose(
  withProps({
    links: [
      {name: '关于会米', to: '/about'},
      {name: '帮助', to: '/help'}
    ]
  })
)(({links}) => (
  <div>
    {
      links.map((link, index) => (
        <span key={index}>
          <Link to={link.to} style={{color: 'initial'}}>{link.name}</Link>
          {
            link !== last(links) ? <span style={{margin: '0 0.5em'}}>|</span> : null
          }
        </span>
      ))
    }
  </div>
))