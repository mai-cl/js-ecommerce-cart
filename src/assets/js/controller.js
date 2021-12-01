import { categoria } from './controllers/categoriaController'
import { home } from './controllers/homeController'
import { producto } from './controllers/productoController'
import Router from './Router'

export const $content = document.getElementById('main')
const $menuBtnResp = document.querySelector('.header__menu-btn-resp')
const $headerRespNav = document.querySelector('.header__responsive-section')
const $submenuResponsiveBtns = document.querySelectorAll(
  '.header__responsive-navlink--hasitems'
)
const $backNavlistBtn = document.querySelector('.header__responsive-back-btn')
const $mainNavlist = document.getElementById('home-links')

document.addEventListener('click', e => {
  if (!e.target.matches('.header__navlink, .navlink, .navlink *')) return
  e.preventDefault()
  const anchor = e.target.closest('a')
  history.pushState({}, '', anchor.href)
  console.log(anchor.href)
  $headerRespNav.classList.remove('show')
  const activeNavlist = document.querySelector(
    '.header__responsive-navlist.active'
  )
  activeNavlist.classList.remove('active')
  $mainNavlist.classList.add('active')
  const navEvent = new PopStateEvent('popstate')
  window.dispatchEvent(navEvent)
})

$menuBtnResp.addEventListener('click', () => {
  $headerRespNav.classList.toggle('show')
})

$submenuResponsiveBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const activeNavlist = document.querySelector(
      '.header__responsive-navlist.active'
    )
    const newNavlist = document.getElementById(`${btn.dataset.items}`)
    activeNavlist.classList.remove('active')
    newNavlist.classList.add('active')
  })
})

$backNavlistBtn.addEventListener('click', () => {
  const activeNavlist = document.querySelector(
    '.header__responsive-navlist.active'
  )
  const newNavlist = document.getElementById(`${activeNavlist.dataset.back}`)

  if (!newNavlist) return $headerRespNav.classList.toggle('show')
  activeNavlist.classList.remove('active')
  newNavlist.classList.add('active')
})

window.addEventListener('popstate', app)

export const globalState = {
  targetProduct: null,
  products: null,
  categorias: null,
}

export const router = new Router('http://localhost:8080')
router.setRoute('/', home)
router.setRoute('/productos', categoria, 1)
router.setRoute('/productos', producto, 2)

function app() {
  window.scrollTo(0, 0)
  router.goTo(location.pathname)
}

export default app
