import React from 'react'
import { Segment, Form, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { compose, withState, withHandlers } from 'recompose'
import { Accounts } from 'meteor/accounts-base'
import Alert from 'react-s-alert'

import AccountPageLayout from '../layouts/AccountPageLayout'

const ForgotPasswordPage = () => (
  <AccountPageLayout>
    <Segment style={{minWidth: '18em'}}>
      <div style={{marginBottom: '1em'}}>
        <ForgotPasswordForm/>
      </div>
      <Links/>
    </Segment>
  </AccountPageLayout>
)

export default ForgotPasswordPage

const ForgotPasswordForm = compose(
  withState('email', 'setEmail', ''),
  withHandlers({
    onEmailChange: ({setEmail}) => e => setEmail(e.target.value),
    onSubmit: ({email}) => e => {
      e.preventDefault()

      if (!email) {
        return Alert.error('请输入邮箱')
      }

      Accounts.forgotPassword({email}, (err) => {
        if (err) {
          console.error(err)
          if (err.reason === 'User not found') {
            Alert.error('该用户尚未注册')
          } else if (err.error === 'too-many-requests') {
            Alert.error('请求过于频繁，请稍后再试')
          } else {
            Alert.error('发送失败')
          }
        } else {
          Alert.success('重置密码链接已发送至您的邮箱，请注意查收')
        }
      })
    }
  })
)(({email, onEmailChange, onSubmit}) => (
  <Form onSubmit={onSubmit}>
    <Form.Input type="email" label="邮箱" value={email} onChange={onEmailChange}/>
    <Button fluid primary type="submit">发送重置密码链接</Button>
  </Form>
))

const Links = () => (
  <div style={{display: 'flex', justifyContent: 'space-between'}}>
    <Link to="/login">前往登录</Link>
    <Link to="/signup">前往注册</Link>
  </div>
)