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
  categorias: [
    {
      id: 1,
      nombre: 'Procesadores',
      pathname: '/productos/procesadores',
    },
    {
      id: 2,
      nombre: 'Memorias RAM',
      pathname: '/productos/memorias-ram',
    },
    {
      id: 3,
      nombre: 'Motherboards',
      pathname: '/productos/motherboards',
    },
    {
      id: 4,
      nombre: 'Placas de Video',
      pathname: '/productos/placas-de-video',
    },
    {
      id: 5,
      nombre: 'Almacenamiento',
      pathname: '/productos/almacenamiento',
    },
    {
      id: 6,
      nombre: 'Fuentes',
      pathname: '/productos/fuentes',
    },
    {
      id: 7,
      nombre: 'Gabinetes',
      pathname: '/productos/gabinetes',
    },
    {
      id: 8,
      nombre: 'Refrigeración',
      pathname: '/productos/refrigeracion',
    },
  ],
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
