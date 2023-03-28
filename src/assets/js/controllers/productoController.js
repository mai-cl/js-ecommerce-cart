import model from '../model'
import productoView from '../views/pages/producto'
import cartView from '../views/fixed/cartView'
import error404View from '../views/pages/error404'
import Router from '../router/Router'
import mainView from '../views/fixed/mainView'
import { MESSAGE, TYPE_MESSAGE } from '../utils/messages'

const onAddToCartBtnClick = async e => {
  if (!e.target.matches('.section-producto__btn')) return
  const btn = e.target
  const productId = btn.dataset.id
  const qty = productoView.getInputQty()

  mainView.renderBlockingLoaderSpinner()

  try {
    await model.getProductById(productId)

    if (
      model.state.targetProduct.stock <
      qty + model.getItemQtyInCart(productId)
    ) {
      throw new Error(MESSAGE.ERROR_STOCK)
    }

    model.addToCart(qty)
    cartView.updateCartUI(model.state.cart)
    mainView.renderMessage(TYPE_MESSAGE.SUCCESS, MESSAGE.SUCCESS_ADD_TO_CART)
  } catch (error) {
    mainView.renderMessage(TYPE_MESSAGE.ERROR, error.message)
  } finally {
    mainView.removeLoaderSpinner()
  }
}

const onControlInputClick = e => {
  if (!e.target.matches('.qty-selector__btn')) return
  const button = e.target
  productoView[button.dataset.action]()
}

export const producto = async () => {
  model.abortIncomingRequest()
  mainView.renderLoaderSpinner()
  mainView.removeMessage()

  try {
    await model.getProductByPathparam(Router.dynamicParams.productSlug)
    if (!model.state.targetProduct) return error404View.show()
    productoView.show(model.state.targetProduct)
    productoView.addHandler('click', onControlInputClick)
    productoView.addHandler('click', onAddToCartBtnClick)
    mainView.removeLoaderSpinner()
  } catch (error) {
    console.log(error)
    if (error.name !== 'AbortError') {
      mainView.renderMessage(TYPE_MESSAGE.ERROR, MESSAGE.ERROR_DEFAULT, true)
      mainView.removeLoaderSpinner()
    }
  }
}
