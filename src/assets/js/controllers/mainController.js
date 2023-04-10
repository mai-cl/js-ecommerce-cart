import headerView from '../views/fixed/headerView'
import footerView from '../views/fixed/footerView'
import model from '../model'
import cartView from '../views/fixed/cartView'
import { routes } from '../router/routes'
import Router from '../router/Router'
import { MESSAGE, TYPE_MESSAGE } from '../utils/messages'
import mainView from '../views/fixed/mainView'
import checkoutPage from '../views/pages/checkout'
import { auth } from '../../../firebase/firebaseConfig'

function onNavlinkClick(e) {
  const anchor = e.target.closest('a')

  if (!anchor) return
  e.preventDefault()
  Router.updateHistoryStack(anchor.href)
  Router.dispatchNavEvent()
}

function onSubmitForm(e) {
  e.preventDefault()
  const form = e.target
  const inputValue = form.search.value

  form.search.blur()
  headerView.hideSearchBar()
  headerView.hideResponsiveNav()
  Router.updateHistoryStack(`/search?query=${inputValue}`)
  Router.dispatchNavEvent()
}

async function onControlInputClick(e) {
  if (!e.target.matches('.qty-selector__btn')) return
  const button = e.target

  cartView.renderLoaderSpinner()
  try {
    await model.getProductById(button.dataset.id)

    if (!model.state.targetProduct.stock) {
      model.deleteItemCart(parseInt(model.state.targetProduct.id))
      cartView.updateCartUI(model.state.cart)
      throw new Error(MESSAGE.ERROR_CART_STOCK)
    }

    model.checkEnoughStock(
      cartView.getInputQty(button.dataset.id),
      button.dataset.action
    )

    cartView[button.dataset.action](button.dataset.id)
    model.updateItemCartQty(cartView.getInputQty(button.dataset.id))
    cartView.updateCartUI(model.state.cart)
    if(location.pathname === '/checkout') checkoutPage.updateCheckoutSummary(model.state.cart)
  } catch (error) {
    cartView.renderMessage(TYPE_MESSAGE.ERROR, error.message)
  } finally {
    cartView.removeLoaderSpinner()
  }
}

async function onDeleteBtnClick(e) {
  if (!e.target.matches('.cart-item__delete-btn, .cart-item__delete-btn *'))
    return
  const button = e.target.closest('.cart-item__delete-btn')
  cartView.renderLoaderSpinner()

  try {
    await model.getProductById(button.dataset.id)
    if (!model.state.targetProduct) return
    const deletedItem = model.deleteItemCart(parseInt(button.dataset.id))
    cartView.updateCartUI(model.state.cart)
    if(location.pathname === '/checkout') checkoutPage.updateCheckoutSummary(model.state.cart)
  } catch (error) {
    cartView.renderMessage(TYPE_MESSAGE.ERROR, error.message)
  } finally {
    cartView.removeLoaderSpinner()
  }
}

async function onLogoutUser(e) {
  if (!e.target.matches('#logout-btn')) return
  mainView.renderBlockingLoaderSpinner()
  try {
    await model.logoutUser()
    mainView.removeLoaderSpinner()
    Router.updateHistoryStack(`/`)
    Router.dispatchNavEvent()
  } catch (error) {
    mainView.removeLoaderSpinner()
    console.error(error)
  }
}

function checkLoginUser() {
  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged(user => {
      if(user) {
        model.state.user = {
          userId: user.uid,
          displayName: user.displayName,
          email: user.email,
        }
        headerView.setLoggedUserOptions()
      headerView.addHandler('click', onLogoutUser)
      } else {
        model.state.user = {}
        headerView.setLoggedOutUserOptions()
      }
      resolve(user)
    }, err => {
      reject(err)
    })
  })
}

function setAppHandlers() {
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
  cartView.addHandler('click', onNavlinkClick)
  cartView.setUIhandlers()
  cartView.addHandler('click', onControlInputClick)
  cartView.addHandler('click', onDeleteBtnClick)

}

function initRouter() {
  Router.init(routes)
}

function loadCartData() {
  model.loadLocalSt()
  cartView.updateCartUI(model.state.cart)
}

export function initApp() {
  mainView.renderBlockingLoaderSpinner()
  checkLoginUser().then(() => {
    mainView.removeLoaderSpinner()
    initRouter()
  })
  loadCartData()
  setAppHandlers()
}
