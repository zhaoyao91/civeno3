import React from 'react'

const LoadingComp = () => (
  <div className="center-in-view-port">
    loading...
  </div>
)

const ErrorComp = () => (
  <div className="center-in-view-port">
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

    async componentWillMount () {
      if (!Component) {
        try {
          const mod = await load()
          Component = mod.default
        } catch (err) {
          console.error(err)
        }
        if (!this._isUnmounted) {
          this.setState({loading: false})
        }
      }
    }

    componentWillUnmount () {
      this._isUnmounted = true
    }

    render () {
      const {loading} = this.state

      if (loading) {
        return <LoadingComp/>
      } else if (Component) {
        return <Component {...this.props}/>
      } else {
        return <ErrorComp/>
      }
    }
  }
}