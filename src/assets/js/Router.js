import error404View from './views/error404View'

class Router {
  constructor() {
    this.routes = []
  }

  setRoute(pathname, pageController, hasPathParam = false) {
    const newRoute = {
      pathname,
      pageController,
      hasPathParam,
    }
    this.routes.push(newRoute)
  }

  goTo(pathname) {
    let route = this.routes.find(route => route.pathname === pathname)

    if (route) return route.pageController()

    let routeWithPathParam = this.routes.find(
      route => pathname.startsWith(route.pathname) && route.hasPathParam
    )

    routeWithPathParam
      ? routeWithPathParam.pageController(this.getPathParam(pathname))
      : error404View.render()
  }

  getPathParam(pathname) {
    return pathname.split('/').reverse()[0]
  }

  dispatchNavEvent() {
    const navEvent = new PopStateEvent('popstate')
    window.dispatchEvent(navEvent)
  }
}

export default new Router()
