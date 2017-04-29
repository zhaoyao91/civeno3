import { createContainer } from 'meteor/react-meteor-data'
import { curryN } from 'lodash/fp'

export default curryN(2)(createContainer)