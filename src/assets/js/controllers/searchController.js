import model from '../model'
import error404View from '../views/pages/error404'
import searchProductosView from '../views/pages/searchProductos'
import cartView from '../views/fixed/cartView'
import mainView from '../views/fixed/mainView'
import { MESSAGE, TYPE_MESSAGE } from '../utils/messages'

const getQueryValue = () => {
  const result = location.search.match(/query=([^&]*)/)
  return result ? result[1] : null
}

const onAddToCartBtnClick = async e => {
  if (!e.target.matches('.itemcard__btn')) return
  const btn = e.target
  const productId = btn.dataset.id
  mainView.renderBlockingLoaderSpinner()

  try {
    await model.getProductById(productId)

    if (model.state.targetProduct.stock < model.getItemQtyInCart(productId) + 1)
      throw new Error(MESSAGE.ERROR_STOCK)

    const addedItem = model.addToCart()
    cartView.updateCartUI(model.state.cart)

    mainView.renderMessage(TYPE_MESSAGE.SUCCESS, MESSAGE.SUCCESS_ADD_TO_CART)
  } catch (error) {
    mainView.renderMessage(TYPE_MESSAGE.ERROR, error.message)
  } finally {
    mainView.removeLoaderSpinner()
  }
}

export const search = async () => {
  const query = getQueryValue()
  if (!query) return error404View.show()
  model.abortIncomingRequest()
  mainView.renderLoaderSpinner()

  mainView.removeMessage()

  try {
    await model.getProductsByQuery(query)
    searchProductosView.show({ query, data: model.state.products })
    searchProductosView.addHandler('click', onAddToCartBtnClick)
    mainView.removeLoaderSpinner()
  } catch (error) {
    if (error.name !== 'AbortError') {
      mainView.renderMessage(TYPE_MESSAGE.ERROR, MESSAGE.ERROR_DEFAULT, true)
      mainView.removeLoaderSpinner()
    }
  }
}
