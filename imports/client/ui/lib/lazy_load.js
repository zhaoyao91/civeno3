import React from 'react'

const LoadingComp = () => (
  <div>
    loading...
  </div>
)

const ErrorComp = () => (
  <div>
    error!
  </div>
)

export default function (load) {
  if (typeof load !== 'function') throw new Error('load must be a function')

  let Component = null

  return class LazyComponent extends React.Component {
    state = {
      loading: !Component,
    }

    componentWillMount () {
      if (!Component) {
        load()
          .then(mod => Component = mod.default)
          .catch(err => console.error(err))
          .then(() => this.setState({loading: false}))
      }
    }

    render () {
      const {loading} = this.state

      if (!loading && Component) {
        return <Component {...this.props}/>
      } else if (loading && !Component) {
        return <LoadingComp/>
      } else {
        return <ErrorComp/>
      }
    }
  }
}