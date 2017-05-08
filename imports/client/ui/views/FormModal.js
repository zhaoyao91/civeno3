import React from 'react'
import { Modal, Button, Form } from 'semantic-ui-react'
import { setDisplayName, setPropTypes, compose, withHandlers, defaultProps, withProps } from 'recompose'
import PropTypes from 'prop-types'

import withToggleState from '../hocs/with_toggle_state'
import defineComponent from '../hocs/define_component'

const FormModal = compose(
  defineComponent('FormModal', {
    trigger: PropTypes.element,
    open: PropTypes.bool,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    submit: PropTypes.func, // async func()
    header: PropTypes.string,
    allowSubmit: PropTypes.bool,
  }),
  defaultProps({
    allowSubmit: true
  }),
  withToggleState('submitting', 'startSubmitting', 'finishSubmitting', false),
  withProps(({allowSubmit, submitting}) => ({
    allowSubmit: allowSubmit && !submitting
  })),
  withHandlers({
    submitForm: ({submit, startSubmitting, finishSubmitting, allowSubmit}) => () => {
      if (allowSubmit) {
        startSubmitting()
        submit()
          .catch(err => console.error(err))
          .then(finishSubmitting)
      }
    }
  }),
  withHandlers({
    onSubmit: ({submitForm}) => e => {
      e.preventDefault()
      submitForm()
    }
  })
)(({children, trigger, open, onOpen, onClose, onSubmit, submitForm, submitting, allowSubmit, header}) => (
  <Modal size="small" open={open} trigger={trigger} onOpen={onOpen} onClose={onClose} closeIcon='close'>
    <Modal.Header content={header}/>
    <Modal.Content>
      <Form loading={submitting} onSubmit={onSubmit}>
        {children}
        <Button style={{display: 'none'}}/>
      </Form>
    </Modal.Content>
    <Modal.Actions>
      <Button onClick={onClose}>返回</Button>
      <Button primary onClick={submitForm} disabled={!allowSubmit}>确认</Button>
    </Modal.Actions>
  </Modal>
))

export default FormModal