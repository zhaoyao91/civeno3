import React from 'react'
import {  Form } from 'semantic-ui-react'
import { setPropTypes, compose, withState, withHandlers, lifecycle } from 'recompose'
import PropTypes from 'prop-types'
import Alert from 'react-s-alert'
import { Accounts } from 'meteor/accounts-base'

import FormModal from './FormModal'
import withToggleState from '../hocs/with_toggle_state'
import onToggle from '../hocs/on_toggle'

export default compose(
  setPropTypes({
    trigger: PropTypes.element,
    open: PropTypes.bool,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
  }),
  withState('oldPassword', 'setOldPassword', ''),
  withState('newPassword', 'setNewPassword', ''),
  withHandlers({
    onOldPasswordChange: ({setOldPassword}) => e => setOldPassword(e.target.value),
    onNewPasswordChange: ({setNewPassword}) => e => setNewPassword(e.target.value),
    resetForm: ({setOldPassword, setNewPassword}) => () => {
      setOldPassword('')
      setNewPassword('')
    }
  }),
  onToggle('open', ({resetForm}) => resetForm()),
  withToggleState('submitting', 'startSubmit', 'finishSubmit', false),
  withHandlers({
    submit: ({oldPassword, newPassword, startSubmit, finishSubmit, onClose}) => () => {
      if (!oldPassword) {
        return Alert.error('请如输入旧密码')
      } else if (!newPassword) {
        return Alert.error('请输入新密码')
      }

      startSubmit()
      Accounts.changePassword(oldPassword, newPassword, (err) => {
        finishSubmit()
        if (err) {
          console.error(err)
          if (err.reason === 'Incorrect password') {
            Alert.error('密码错误')
          } else {
            Alert.error('密码修改失败')
          }
        } else {
          Alert.success('密码修改成功')
          onClose()
        }
      })
    }
  }),
)
(({trigger, open, onOpen, onClose, oldPassword, onOldPasswordChange, newPassword, onNewPasswordChange, submit, submitting}) => (
  <FormModal open={open} trigger={trigger} onOpen={onOpen} onClose={onClose} header="修改密码" submitting={submitting}
             submit={submit}>
    <Form.Input autoFocus type="password" required label="旧密码" value={oldPassword} onChange={onOldPasswordChange}/>
    <Form.Input type="password" required label="新密码" value={newPassword} onChange={onNewPasswordChange}/>
  </FormModal>
))