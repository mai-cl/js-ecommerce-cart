import { categoria } from './controllers/categoriaController'
import { home } from './controllers/homeController'
import { producto } from './controllers/productoController'
import headerView from './views/headerView'
import mainView from './views/mainView'
import footerView from './views/footerView'
import Router from './Router'

function onNavlinkClick(e) {
  console.log('click', e.target)
  if (!e.target.matches('a.header__navlink, a.navlink, a.navlink *')) return
  e.preventDefault()
  const anchor = e.target.closest('a')
  history.pushState({}, '', anchor.href)
  headerView.hideResponsiveNav()
  headerView.resetResponsiveNav()
  Router.dispatchNavEvent()
}

Router.setRoute('/', home)

const categoriesPathnames = [
  '/productos/procesadores',
  '/productos/motherboards',
  '/productos/memorias-ram',
  '/productos/almacenamiento',
  '/productos/placas-de-video',
  '/productos/fuentes',
  '/productos/gabinetes',
  '/productos/refrigeracion',
]

categoriesPathnames.forEach(catPathname => {
  Router.setRoute(catPathname, categoria)
  Router.setRoute(catPathname, producto, true)
})

function app() {
  window.scrollTo(0, 0)
  Router.goTo(location.pathname)
}

function setInitialHandlers() {
  window.addEventListener('popstate', app)
  headerView.addHandler('click', onNavlinkClick)
  mainView.addHandler('click', onNavlinkClick)
  footerView.addHandler('click', onNavlinkClick)
}

setInitialHandlers()

export default app
