import '../views/cartView'
import headerView from '../views/headerView'
import mainView from '../views/mainView'
import footerView from '../views/footerView'
import model from '../model'
import cartView from '../views/cartView'
import loaderSpinnerView from '../views/loaderSpinnerView'
import { routes } from '../routes'
import Router from '../Router'
import messageView from '../views/messageView'

function onNavlinkClick(e) {
  const anchor = e.target.closest('a')
  if (!anchor) return
  e.preventDefault()
  history.pushState({}, '', anchor.href)

  Router.dispatchNavEvent()
}

function onSubmitForm(e) {
  e.preventDefault()
  const form = e.target
  const inputValue = form.search.value
  form.search.blur()
  headerView.hideSearchBar()
  headerView.hideResponsiveNav()
  history.pushState({}, '', `/search?query=${inputValue}`)
  Router.dispatchNavEvent()
}

async function onControlInputClick(e) {
  if (!e.target.matches('.qty-selector__btn')) return
  const button = e.target
  loaderSpinnerView.renderTop()

  try {
    await model.getProductById(button.dataset.id)

    if (!model.state.targetProduct.stock) {
      model.deleteItemCart(parseInt(model.state.targetProduct.id))
      cartView.updateCartUI(model.state.cart)
      throw new Error('Producto sin stock!')
    }

    model.checkEnoughStock(
      cartView.getInputQty(button.dataset.id),
      button.dataset.action
    )

    cartView[button.dataset.action](button.dataset.id)
    model.updateItemCartQty(cartView.getInputQty(button.dataset.id))
    cartView.updateCartUI(model.state.cart)
  } catch (error) {
    messageView.renderMessageOn(
      cartView.messageContainer(),
      'error',
      error.message
    )
  } finally {
    loaderSpinnerView.removeTop()
  }
}

async function onDeleteBtnClick(e) {
  if (!e.target.matches('.cart-item__delete-btn, .cart-item__delete-btn *'))
    return
  const button = e.target.closest('.cart-item__delete-btn')
  loaderSpinnerView.renderTop()

  try {
    await model.getProductById(button.dataset.id)
    if (!model.state.targetProduct) return
    const deletedItem = model.deleteItemCart(parseInt(button.dataset.id))
    cartView.updateCartUI(model.state.cart)
  } catch (error) {
    messageView.renderMessageOn(
      cartView.messageContainer(),
      'error',
      error.message
    )
  } finally {
    loaderSpinnerView.removeTop()
  }
}

export function setInitialHandlers() {
  window.addEventListener('popstate', () => {
    headerView.hideSearchBar()
    headerView.hideResponsiveNav()
    cartView.closeCart()
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
