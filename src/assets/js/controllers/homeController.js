import model from '../model'
import homePage from '../views/pages/home'

import cartView from '../views/fixed/cartView'
import { MESSAGE, TYPE_MESSAGE } from '../utils/messages'
import mainView from '../views/fixed/mainView'

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

export const home = async () => {
  model.abortIncomingRequest()
  mainView.removeMessage()
  mainView.renderLoaderSpinner()

  try {
    await model.getProducts()

    homePage.show({
      products: model.state.products,
      bannerData: model.getBannerData(),
    })
    homePage.initCarousel()

    homePage.addHandler('click', onAddToCartBtnClick)
    mainView.removeLoaderSpinner()
  } catch (error) {
    if (error.name !== 'AbortError') {
      mainView.renderMessage(TYPE_MESSAGE.ERROR, MESSAGE.ERROR_DEFAULT, true)
      mainView.removeLoaderSpinner()
    }
  }
}
