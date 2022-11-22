import error404View from './views/error404View'

class Router {
  constructor() {
    this.dynamicParams = {}
  }

  init(routes) {
    this.routes = routes
    this.navigate(location.pathname)
  }

  dispatchNavEvent() {
    const navEvent = new PopStateEvent('popstate')
    window.dispatchEvent(navEvent)
  }

  navigate(path) {
    window.scrollTo(0, 0)
    this.resolve(this.routes, path)
  }

  setPathParam(paramName, paramValue) {
    this.dynamicParams[paramName] = paramValue
  }

  resolve(routes, path) {
    if (!routes.length) return

    // BFS
    const queue = [{ routes, baseUrl: '' }]

    while (queue.length) {
      const currRoute = queue.shift()

      for (const route of currRoute.routes || []) {
        let fullpath = `${currRoute.baseUrl}/${route.path}`

        if (fullpath === path) {
          const queryParams = getQueryParams(location.search)
          route.action(queryParams) //renderiza el contenido
          return
        }

        if (path.startsWith(currRoute.baseUrl) && route.isDynamicParam) {
          this.setPathParam(
            route.pathParamName,
            path.split('/')[currRoute.baseUrl.split('/').length]
          )

          if (isSameDepthLevel(fullpath, path)) {
            const queryParams = getQueryParams(location.search)
            route.action(queryParams)
            return
          }
          fullpath = `${currRoute.baseUrl}/${
            path.split('/')[currRoute.baseUrl.split('/').length]
          }`
        }

        queue.push({ routes: route.children, baseUrl: fullpath })
      }
    }

    error404View.render()
  }
}

const isSameDepthLevel = (path1, path2) =>
  path1.split('/').length === path2.split('/').length

const getQueryParams = path => {
  return path
    ? (/^[?#]/.test(path) ? path.slice(1) : path)
        .split('&')
        .reduce((params, param) => {
          let [key, value] = param.split('=')
          params[key] = value
            ? decodeURIComponent(value.replace(/\+/g, ' '))
            : ''
          return params
        }, {})
    : {}
}

export default new Router()
