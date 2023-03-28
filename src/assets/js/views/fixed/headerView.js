const menuBtnResp = document.getElementById('open-menu-btn')
const navSection = document.getElementById('nav-section')
const navContent = document.getElementById('nav-main')
const openSearchFormBtn = document.querySelector('.header__button--search-resp')
const closeSearchFormBtn = document.getElementById('close-form-btn')
const searchSectionResp = document.querySelector('.header__search-section-resp')

function addHandler(event, handler) {
  document.querySelector('header').addEventListener(event, handler)
}

function setUIhandlers() {
  const resizeObserver = new ResizeObserver(entries => {
    if (!navSection.style.maxHeight) return
    navSection.style.maxHeight = `${navContent.scrollHeight}px`
  })

  resizeObserver.observe(navContent)

  menuBtnResp.addEventListener('click', () => {
    navContent.classList.toggle('open')
    if (navSection.style.maxHeight) {
      navSection.style.maxHeight = null
    } else {
      navSection.style.maxHeight = `${navContent.scrollHeight}px`
    }
  })

  openSearchFormBtn.addEventListener('click', () => {
    searchSectionResp.classList.add('show')
    searchSectionResp.querySelector('form .header__searchinput').focus()
  })

  closeSearchFormBtn.addEventListener('click', () => {
    searchSectionResp.classList.remove('show')
  })
}

setUIhandlers()

function hideResponsiveNav() {
  navContent.classList.remove('open')
  navSection.style.maxHeight = null
}

function hideSearchBar() {
  searchSectionResp.classList.remove('show')
}

export default {
  addHandler,
  hideResponsiveNav,
  hideSearchBar,
}
