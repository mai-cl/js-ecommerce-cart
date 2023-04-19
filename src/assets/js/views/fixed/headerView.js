const menuBtnResp = document.getElementById('open-menu-btn')
const navSection = document.getElementById('nav-section')
const navContent = document.getElementById('nav-main')
const openSearchFormBtn = document.querySelector('.header__button--search-resp')
const closeSearchFormBtn = document.getElementById('close-form-btn')
const searchSectionResp = document.querySelector('.header__search-section-resp')
const headerUserBtn = document.getElementById('header-user-btn')
const userOptionsMdScreen = document.getElementById('user-options-md-screen')

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

  searchSectionResp.addEventListener('transitionend', () => {
    if (searchSectionResp.classList.contains('show')) {
      searchSectionResp.querySelector('form .header__searchinput').focus()
    }
  })

  openSearchFormBtn.addEventListener('click', () => {
    searchSectionResp.classList.add('show')
  })

  closeSearchFormBtn.addEventListener('click', () => {
    searchSectionResp.querySelector('form .header__searchinput').blur()
    searchSectionResp.classList.remove('show')
  })
}

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
  userOptionsMdScreen.innerHTML = `
    <i class="far fa-user user-icon"></i>
    <a class="user-link" href="/account">Mi cuenta</a>
    <span class="user-btn" id='logout-btn-md-screen'>Cerrar sesión</span>
  `
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
  userOptionsMdScreen.innerHTML = `
    <i class="far fa-user user-icon"></i>
    <a class="user-link" href="/login">Iniciar sesión</a>
    <a class="user-link" href="/register">Crear cuenta</a>
  `
}

export default {
  setUIhandlers,
  addHandler,
  hideResponsiveNav,
  hideSearchBar,
  setLoggedUserOptions,
  setLoggedOutUserOptions,
}
