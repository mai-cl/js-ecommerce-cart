import { error404 } from './pages/404Controller'

export default class Router {
  constructor(origin) {
    this.host = origin
    this.routes = []
  }

  setRoute(pathname, pageController, cantPathParams = 0) {
    const newRoute = {
      pathname,
      pageController,
      cantPathParams,
    }
    this.routes.push(newRoute)
  }

  goTo(pathname) {
    let route = this.routes.find(route => route.pathname === pathname)
    if (route) {
      return route.pageController()
    }

    console.log(pathname)

    route = this.routes.find(
      route =>
        pathname.startsWith(route.pathname) &&
        route.cantPathParams === this.cantPathParams(pathname)
    )

    if (route) {
      route.pageController()
    } else {
      console.log('not found')
      error404()
    }
  }

  cantPathParams(pathname) {
    return pathname.split('/').slice(2).length
  }
}

function generatePathParams(pathname) {}
