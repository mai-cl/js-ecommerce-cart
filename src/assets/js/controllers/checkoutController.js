import model from '../model'
import mainView from '../views/fixed/mainView'
import cartView from '../views/fixed/cartView'
import checkoutPage from '../views/pages/checkout'
import { MESSAGE, TYPE_MESSAGE } from '../utils/messages'
import Router from '../router/Router'
import { auth } from '../../../firebase/firebaseConfig'

async function onSubmitOrder(e) {
  e.preventDefault()
  if (!e.target.matches('#checkout-form')) return

  mainView.renderBlockingLoaderSpinner()

  try {
    const { name, phone, email, confirmarEmail } = checkoutPage.getFormData()
    if (email !== confirmarEmail) throw new Error(MESSAGE.ERROR_DIFF_EMAIL_BUY)
    if (!model.getCart().items.length)
      throw new Error(MESSAGE.ERROR_EMPTY_CART_BUY)
    const orderId = await model.confirmBuy({
      userId: auth.currentUser.uid,
      name,
      phone,
      email,
    })
    mainView.removeLoaderSpinner()

    model.clearCart()
    cartView.updateCartUI(model.state.cart)

    Router.updateHistoryStack(`/`)
    Router.dispatchNavEvent()
    mainView.renderMessage(TYPE_MESSAGE.SUCCESS, MESSAGE.SUCCESS_BUY(orderId))
  } catch (error) {
    mainView.removeLoaderSpinner()
    mainView.renderMessage(TYPE_MESSAGE.ERROR, error.message)
  }
}

export const checkout = () => {
  model.abortIncomingRequest()
  mainView.removeMessage()
  mainView.clear()

  if (!auth.currentUser) {
    Router.replaceHistoryState('/login?redirect=/checkout')
    Router.dispatchNavEvent()
    return
  }
  checkoutPage.show(model.getCart())
  checkoutPage.addHandler('submit', onSubmitOrder)
}
