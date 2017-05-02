import { lifecycle } from 'recompose'

/**
 * preload a lazy component, usually a page
 * @param {[Func]} loaders # load function, such as () => import(...)
 */
export default (...loaders) => lifecycle({
  componentDidMount() {
    loaders.forEach(loader => loader())
  }
})