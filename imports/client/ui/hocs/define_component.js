import { setDisplayName, setPropTypes, pure, compose } from 'recompose'

export default function (displayName, propTypes = {}) {
  return compose(
    setDisplayName(displayName),
    setPropTypes(propTypes),
    pure
  )
}