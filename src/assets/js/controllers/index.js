import '../views/cartView'
import headerView from '../views/headerView'
import mainView from '../views/mainView'
import footerView from '../views/footerView'
import model from '../model'
import cartView from '../views/cartView'
import loaderSpinnerView from '../views/loaderSpinnerView'
import { routes } from '../routes'
import Router from '../Router'

function onNavlinkClick(e) {
  if (!e.target.matches('a.header__navlink, a.navlink, a.navlink *')) return
  e.preventDefault()
  const anchor = e.target.closest('a')
  history.pushState({}, '', anchor.href)
  headerView.hideResponsiveNav()
  headerView.resetResponsiveNav()
  Router.dispatchNavEvent()
}

function onSubmitForm(e) {
  e.preventDefault()
  const form = e.target
  const inputValue = form.search.value
  form.search.blur()
  history.pushState({}, '', `/search?query=${inputValue}`)
  Router.dispatchNavEvent()
}

async function onControlInputClick(e) {
  if (!e.target.matches('.qty-selector__btn')) return
  const button = e.target
  cartView[button.dataset.action](button.dataset.id)
  loaderSpinnerView.renderTop()
  await model.getProductById(button.dataset.id)
  loaderSpinnerView.removeTop()
  if (!model.state.targetProduct) return
  model.updateItemCartQty(cartView.getInputQty(button.dataset.id))
  cartView.updateCartUI(model.state.cart)
}

async function onDeleteBtnClick(e) {
  if (!e.target.matches('.cart-item__delete-btn, .cart-item__delete-btn *'))
    return
  const button = e.target.closest('.cart-item__delete-btn')
  await model.getProductById(button.dataset.id)
  if (!model.state.targetProduct) return
  const deletedItem = model.deleteItemCart(parseInt(button.dataset.id))
  cartView.updateCartUI(model.state.cart)
}

export function setInitialHandlers() {
  window.addEventListener('popstate', () => {
    Router.navigate(location.pathname)
  })
  headerView.addHandler('click', onNavlinkClick)
  headerView.addHandler('submit', onSubmitForm)
  mainView.addHandler('click', onNavlinkClick)
  footerView.addHandler('click', onNavlinkClick)
  cartView.addHandler('click', onControlInputClick)
  cartView.addHandler('click', onDeleteBtnClick)
}

export function initRouter() {
  Router.init(routes)
}

export function loadCartData() {
  model.loadLocalSt()
  cartView.updateCartUI(model.state.cart)
}