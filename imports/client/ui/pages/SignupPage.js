import React from 'react'
import { Segment, Form, Button } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom'
import { compose, withState, withHandlers } from 'recompose'
import { Accounts } from 'meteor/accounts-base'
import Alert from 'react-s-alert'

import AccountPageLayout from '../layouts/AccountPageLayout'

const SignupPage = () => (
  <AccountPageLayout>
    <Segment style={{minWidth: '18em'}}>
      <div style={{marginBottom: '1em'}}>
        <SignupForm/>
      </div>
      <Links/>
    </Segment>
  </AccountPageLayout>
)

export default SignupPage

const SignupForm = compose(
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

      Accounts.createUser({email, password}, (err) => {
        if (err) {
          console.error(err)
          if (err.reason === 'Email already exists.') {
            Alert.error('该邮箱已经被占用')
          } else {
            Alert.error('注册失败')
          }
        } else {
          Alert.success('注册成功')
          history.push('/')
        }
      })
    }
  })
)(({email, password, onEmailChange, onPasswordChange, onSubmit}) => (
  <Form onSubmit={onSubmit}>
    <Form.Input type="email" label="邮箱" value={email} onChange={onEmailChange}/>
    <Form.Input type="password" label="密码" value={password} onChange={onPasswordChange}/>
    <Button fluid primary type="submit">注册</Button>
  </Form>
))

const Links = () => (
  <div style={{display: 'flex', justifyContent: 'space-between'}}>
    <Link to="/login">前往登录</Link>
    <Link to="/forgot-password">找回密码</Link>
  </div>
)