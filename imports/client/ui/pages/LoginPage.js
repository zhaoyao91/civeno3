import React from 'react'
import { Segment, Form, Button } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom'
import { compose, withState, withHandlers } from 'recompose'
import { Meteor } from 'meteor/meteor'
import Alert from 'react-s-alert'

import AccountPageLayout from '../layouts/AccountPageLayout'

const LoginPage = () => (
  <AccountPageLayout>
    <Segment style={{minWidth: '18rem'}}>
      <div style={{marginBottom: '1rem'}}>
        <LoginForm/>
      </div>
      <Links/>
    </Segment>
  </AccountPageLayout>
)

export default LoginPage

const LoginForm = compose(
  withState('email', 'setEmail', ''),
  withState('password', 'setPassword', ''),
  withRouter,
  withHandlers({
    onEmailChange: ({setEmail}) => e => setEmail(e.target.value),
    onPasswordChange: ({setPassword}) => e => setPassword(e.target.value),
    onSubmit: ({email, password, history}) => e => {
      e.preventDefault()

      if (!email) {
        return Alert.error('请输入邮箱')
      } else if (!password) {
        return Alert.error('请输入密码')
      }

      Meteor.loginWithPassword(email, password, (err) => {
        if (err) {
          console.error(err)
          if (err.reason === 'User not found') {
            Alert.error('该用户尚未注册')
          } else if (err.reason === 'Incorrect password') {
            Alert.error('密码错误')
          } else {
            Alert.error('登录失败')
          }
        } else {
          Alert.success('登录成功')
          history.push('/')
        }
      })
    }
  })
)(({email, password, onEmailChange, onPasswordChange, onSubmit}) => (
  <Form onSubmit={onSubmit}>
    <Form.Input type="email" label="邮箱" value={email} onChange={onEmailChange}/>
    <Form.Input type="password" label="密码" value={password} onChange={onPasswordChange}/>
    <Button fluid color="green" type="submit">登录</Button>
  </Form>
))

const Links = () => (
  <div style={{display: 'flex', justifyContent: 'space-between'}}>
    <Link to="/signup">前往注册</Link>
    <Link to="/forgot-password">找回密码</Link>
  </div>
)