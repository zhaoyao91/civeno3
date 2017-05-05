import React from 'react'
import { Form, Input, Button } from 'semantic-ui-react'
import { renameProps, setPropTypes, compose, withState, withHandlers, withProps, defaultProps } from 'recompose'
import PropTypes from 'prop-types'
import { has } from 'lodash/fp'

import withToggleState from '../hocs/with_toggle_state'

const SavableInput = compose(
  setPropTypes({
    value: PropTypes.any,
    // async func(newValue): feedback | undefined
    // feedback: {syncValue}
    // syncValue # if this field is specified, the underlining temp value will be set as it
    save: PropTypes.func,
    label: PropTypes.string,
    style: PropTypes.object,
    required: PropTypes.bool,
    // only allow value related component
    as: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.element,
    ]),
    controlProps: PropTypes.object,
  }),
  defaultProps({
    as: Input
  }),
  withToggleState('saving', 'startSaving', 'finishSaving', false),
  renameProps({
    as: 'Control',
    value: 'actualValue',
    saving: 'loading',
  }),
  withState('value', 'setValue', ({actualValue}) => actualValue),
  withHandlers({
    onValueChange: ({setValue, loading}) => e => {
      if (!loading) setValue(e.target.value)
    },
    onSubmit: ({save, value, setValue, startSaving, finishSaving}) => e => {
      e.preventDefault()
      startSaving()
      save(value)
        .then(feedback => {
          if (has('syncValue', feedback)) setValue(feedback['syncValue'])
        })
        .catch(err => console.error(err))
        .then(finishSaving)
    },
    onReset: ({actualValue, setValue}) => () => setValue(actualValue),
  }),
  withToggleState('focused', 'focus', 'blur', false),
  withProps(({value, actualValue}) => ({
    valueDirty: value !== actualValue
  })),
  withProps(({valueDirty, focused, loading}) => ({
    displayActions: valueDirty || focused,
    disableActions: !valueDirty || loading,
    disableControl: loading,
  }))
)(({required, label, Control, value, onValueChange, onSubmit, onReset, loading, style, displayActions, disableActions, focus, blur, controlProps, disableControl}) => (
  <Form style={style} onSubmit={onSubmit}>
    <Form.Field required={required}>
      <label>{label}</label>
      <Control disabled={disableControl} value={value} onChange={onValueChange} onFocus={focus}
               onBlur={blur} {...controlProps}/>
    </Form.Field>
    {
      displayActions && <div>
        <Button primary type="submit" loading={loading} disabled={disableActions}>保存</Button>
        <Button onClick={onReset} type="button" disabled={disableActions}>重置</Button>
      </div>
    }
  </Form>
))

export default SavableInput