const menuBtnResp = document.querySelector('.header__menu-btn-resp')
const headerRespNav = document.querySelector('.header__responsive-section')
const submenuResponsiveBtns = document.querySelectorAll(
  '.header__responsive-navlink--hasitems'
)
const backNavlistBtn = document.querySelector('.header__responsive-back-btn')
const mainNavlist = document.getElementById('home-links')

function addHandler(event, handler) {
  document.querySelector('header').addEventListener(event, handler)
}

function hideResponsiveNav() {
  headerRespNav.classList.remove('show')
}

function resetResponsiveNav() {
  document
    .querySelector('.header__responsive-navlist.active')
    .classList.remove('active')
  mainNavlist.classList.add('active')
}

function setUIhandlers() {
  menuBtnResp.addEventListener('click', () =>
    headerRespNav.classList.toggle('show')
  )

  submenuResponsiveBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const activeNavlist = document.querySelector(
        '.header__responsive-navlist.active'
      )
      const newNavlist = document.getElementById(`${btn.dataset.items}`)
      activeNavlist.classList.remove('active')
      newNavlist.classList.add('active')
    })
  })

  backNavlistBtn.addEventListener('click', () => {
    const activeNavlist = document.querySelector(
      '.header__responsive-navlist.active'
    )
    const newNavlist = document.getElementById(`${activeNavlist.dataset.back}`)

    if (!newNavlist) return hideResponsiveNav()
    activeNavlist.classList.remove('active')
    newNavlist.classList.add('active')
  })
}

setUIhandlers()

export default {
  addHandler,
  hideResponsiveNav,
  resetResponsiveNav,
}
