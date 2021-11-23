import { categoria } from './pages/categoriaController'
import { home } from './pages/homeController'
import { producto } from './pages/productoController'
import Router from './Router'

export const $content = document.getElementById('main')

document.addEventListener('click', e => {
  if (!e.target.matches('.header__navlink, .navlink, .navlink *')) return
  e.preventDefault()
  const anchor = e.target.closest('a')
  history.pushState({}, '', anchor.href)
  console.log(anchor.href)
  const navEvent = new PopStateEvent('popstate')
  window.dispatchEvent(navEvent)
})

window.addEventListener('popstate', App)

export const globalState = {
  targetProduct: null,
  products: null,
  categorias: null,
}

export const router = new Router('http://localhost:8080')
router.setRoute('/', home)
router.setRoute('/productos', categoria, 1)
router.setRoute('/productos', producto, 2)

function App() {
  window.scrollTo(0, 0)
  router.goTo(location.pathname)
}

export default App
