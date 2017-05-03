import React from 'react'
import { defaults } from 'lodash/fp'

/**
 * load a dynamic module
 *
 * e.g.
 *
 * case: load a single module
 * withDynamicModule('SomeComponent', () => import('some-component').then(mod => mod.default))
 *
 * case: load a batch of modules
 * withDynamicModule('dynamicModules' () => Promise.all([
 *   import('component1').then(mod => mod.default)),
 *   import('component2').then(mod => mod.default)),
 *   import('some-utils) // we don't need to resolve the default export
 * ])
 * in this case, we can resolve the modules in component params this way:
 * ({dynamicModules: [Component1, Component2, someUtils]}) => (<div>
 *   <Component1/>
 *   <Component2/>
 *   ...
 * </div>)
 *
 * @param name
 * @param load # returns a promise which resolves a module
 * @param [options]
 * @param [options.LoadingComp]
 * @param [options.ErrorComp]
 * @returns HOC
 */
export default function (name, load, options) {
  if (typeof name !== 'string') throw new Error('name must be a string')
  if (typeof load !== 'function') throw new Error('load must be a function which returns a promise')

  options = defaults({
    LoadingComp: LoadingComp,
    ErrorComp: ErrorComp,
  }, options)

  let module = null

  return function (Component) {
    return class WithDynamicModule extends React.Component {
      state = {
        loading: false,
        error: false,
        module: module
      }

      componentWillMount () {
        if (!this.state.module) {
          this.setState({loading: true})
          load()
            .then(mod => {
              module = mod
              this.setState({
                loading: false,
                module: mod
              })
            })
            .catch(err => {
              console.error(err)
              this.setState({
                loading: false,
                error: true
              })
            })
        }
      }

      render () {
        const {loading, error, module} = this.state
        if (loading) {
          return <options.LoadingComp/>
        } else if (error || !module) {
          return <options.ErrorComp/>
        } else {
          return <Component {...this.props} {...{[name]: module}}/>
        }
      }
    }
  }
}

const ErrorComp = () => (
  <div style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
    <span>error!</span>
  </div>
)

const LoadingComp = () => (
  <div style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
    <span>loading...</span>
  </div>
)