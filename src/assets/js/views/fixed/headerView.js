const menuBtnResp = document.getElementById('open-menu-btn')
const navSection = document.getElementById('nav-section')
const navContent = document.getElementById('nav-main')
const openSearchFormBtn = document.querySelector('.header__button--search-resp')
const closeSearchFormBtn = document.getElementById('close-form-btn')
const searchSectionResp = document.querySelector('.header__search-section-resp')
const loginWithGoogleBtn = document.getElementById('login-with-google-btn')
const headerUserBtn = document.getElementById('header-user-btn')

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

function setLoggedUserOptions() {
  headerUserBtn.querySelector('.header__sublist').remove()
  headerUserBtn.insertAdjacentHTML(
    'beforeend',
    `
  <ul class="header__sublist">
  <li class="header__sublist-item">
    <a class="header__sublist-anchor" href="/account">Mi cuenta</a>
  </li>
  <li class="header__sublist-item">
    <span class="header__sublist-anchor" id='logout-btn'>Cerrar sesión</span>
  </li>
</ul>
  `
  )
}

function setLoggedOutUserOptions() {
  headerUserBtn.querySelector('.header__sublist').remove()
  headerUserBtn.insertAdjacentHTML(
    'beforeend',
    `
    <ul class="header__sublist">
      <li class="header__sublist-item">
        <a class="header__sublist-anchor" href="/login"
          >Iniciar sesión</a
        >
      </li>
      <li class="header__sublist-item">
        <a class="header__sublist-anchor" href="/register"
          >Crear cuenta</a
        >
      </li>
    </ul>
  `
  )
}

export default {
  addHandler,
  hideResponsiveNav,
  hideSearchBar,
  setLoggedUserOptions,
  setLoggedOutUserOptions,
}
