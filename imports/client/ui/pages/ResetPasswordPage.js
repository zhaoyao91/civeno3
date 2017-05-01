import React from 'react'
import { Segment, Form, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { compose, withState, withHandlers, setPropTypes } from 'recompose'
import { Accounts } from 'meteor/accounts-base'
import Alert from 'react-s-alert'
import PropTypes from 'prop-types'

import AccountPageLayout from '../layouts/AccountPageLayout'

const ResetPasswordPage = ({match}) => (
  <AccountPageLayout>
    <Segment style={{minWidth: '18rem'}}>
      <div style={{marginBottom: '1rem'}}>
        <ResetPasswordForm token={match.params.token}/>
      </div>
      <Links/>
    </Segment>
  </AccountPageLayout>
)

export default ResetPasswordPage

const ResetPasswordForm = compose(
  setPropTypes({
    token: PropTypes.string
  }),
  withState('password', 'setPassword', ''),
  withHandlers({
    onPasswordChange: ({setPassword}) => e => setPassword(e.target.value),
    onSubmit: ({password, token}) => e => {
      e.preventDefault()

      if (!password) {
        return Alert.error('请输入新密码')
      }

      Accounts.resetPassword(token, password, (err) => {
        if (err) {
          console.error(err)
          if (err.reason === 'Token expired') {
            Alert.error('链接已过期')
          } else if (err.error === 'too-many-requests') {
            Alert.error('请求过于频繁，请稍后再试')
          } else {
            Alert.error('重置密码失败')
          }
        } else {
          Alert.success('密码已重置')
        }
      })
    }
  })
)(({password, onPasswordChange, onSubmit}) => (
  <Form onSubmit={onSubmit}>
    <Form.Input type="password" label="新密码" value={password} onChange={onPasswordChange}/>
    <Button fluid primary type="submit">重置密码</Button>
  </Form>
))

const Links = () => (
  <div style={{display: 'flex', justifyContent: 'space-between'}}>
    <Link to="/login">前往登录</Link>
    <Link to="/signup">前往注册</Link>
  </div>
)