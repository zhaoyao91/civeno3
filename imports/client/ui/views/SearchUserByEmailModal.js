import React from 'react'
import { pure, compose, renameProp, withState, setPropTypes, withHandlers, withProps, setDisplayName } from 'recompose'
import PropTypes from 'prop-types'
import { Form, Input, Message } from 'semantic-ui-react'
import { Meteor } from 'meteor/meteor'
import Alert from 'react-s-alert'
import { isEmail } from 'validator'
import { debounce, prop } from 'lodash/fp'

import UserAvatar from './UserAvatar'
import FormModal from './FormModal'

const SearchUserByEmailModal = compose(
  setDisplayName('SearchUserByEmailModal'),
  setPropTypes({
    trigger: PropTypes.element,
    open: PropTypes.bool,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    submit: PropTypes.func, // async func(user)
    header: PropTypes.string,
  }),
  renameProp('submit', 'submitUser'),
  withState('revoked', 'setRevoked', true),
  withState('user', 'setUser', null),
  withProps(({user, revoked}) => ({
    allowSubmit: !revoked && !!user
  })),
  withHandlers({
    onRevokeUser: ({setRevoked}) => () => setRevoked(true),
    onNoUser: ({setUser, setRevoked}) => () => {
      setRevoked(false)
      setUser(null)
    },
    onFindUser: ({setUser, setRevoked}) => user => {
      setRevoked(false)
      setUser(user)
    },
    submit: ({submitUser, user}) => async () => {
      return await submitUser(user)
    }
  })
)(({trigger, open, onOpen, onClose, submit, header, allowSubmit, onRevokeUser, onNoUser, onFindUser, user, revoked}) => (
  <FormModal trigger={trigger} open={open} onOpen={onOpen} onClose={onClose} submit={submit} header={header}
             allowSubmit={allowSubmit}>
    <SearchUserInput onRevokeUser={onRevokeUser} onNoUser={onNoUser} onFindUser={onFindUser}/>
    {revoked && <WaitView/>}
    {(!revoked && !user) && <NoUserView/>}
    {(!revoked && user) && <UserView user={user}/>}
  </FormModal>
))

export default SearchUserByEmailModal

const NoUserView = () => (
  <Message style={{margin: 0}} warning visible>没有找到该用户</Message>
)

const WaitView = () => (
  <Message style={{margin: 0}} visible>请输入完整邮箱地址以查询用户</Message>
)

const UserView = ({user}) => (
  <div style={{display: 'flex', alignItems: 'center'}}>
    <UserAvatar name={prop('profile.name', user)} size={47}/>
    <p style={{marginLeft: '1rem'}}>{prop('profile.name', user)}</p>
  </div>
)

const SearchUserInput = compose(
  setPropTypes({
    onRevokeUser: PropTypes.func,
    onNoUser: PropTypes.func,
    onFindUser: PropTypes.func, // func(user)
  }),
  pure,
  withState('loading', 'setLoading', false),
  withHandlers({
    findUser: ({onNoUser, onFindUser, setLoading}) => debounce(800, email => {
        if (isEmail(email)) {
          setLoading(true)
          Meteor.call('User.findUserByEmail', email, (err, user) => {
            setLoading(false)
            if (err) {
              console.error(err)
              Alert.error('查找用户失败')
            } else if (user) {
              onFindUser(user)
            } else {
              onNoUser()
            }
          })
        }
      }
    )
  }),
  withHandlers({
    onEmailChange: ({findUser, onRevokeUser}) => e => {
      const email = e.target.value
      onRevokeUser()
      findUser(email)
    }
  }),
)(({onEmailChange, loading}) => (
  <Form.Field required>
    <label>邮箱</label>
    <Input onChange={onEmailChange} autoFocus type="email" icon="search" loading={loading}/>
  </Form.Field>
))