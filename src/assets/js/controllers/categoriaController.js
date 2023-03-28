import model from '../model'
import categoriaPage from '../views/pages/categoria'
import cartView from '../views/fixed/cartView'
import mainView from '../views/fixed/mainView'
import { MESSAGE, TYPE_MESSAGE } from '../utils/messages'

const onAddToCartBtnClick = async e => {
  if (!e.target.matches('.itemcard__btn')) return
  const btn = e.target
  const productId = btn.dataset.id

  mainView.renderBlockingLoaderSpinner()

  try {
    await model.getProductById(productId)

    if (model.state.targetProduct.stock < model.getItemQtyInCart(productId) + 1)
      throw new Error(MESSAGE.ERROR_STOCK)

    model.addToCart()
    cartView.updateCartUI(model.state.cart)
    mainView.renderMessage(TYPE_MESSAGE.SUCCESS, MESSAGE.SUCCESS_ADD_TO_CART)
  } catch (error) {
    mainView.renderMessage(TYPE_MESSAGE.ERROR, error.message)
  } finally {
    mainView.removeLoaderSpinner()
  }
}

export const categoria = async () => {
  const pathname = location.pathname
  model.abortIncomingRequest()
  mainView.removeMessage()
  mainView.renderLoaderSpinner()

  try {
    await model.getCategories()
    const categoria = model.state.categorias.find(
      categoria => categoria.pathname === pathname
    )

    await model.getProductsByCategory(categoria.id)
    categoriaPage.show({
      categoria: categoria.nombre,
      data: model.state.products,
    })
    categoriaPage.addHandler('click', onAddToCartBtnClick)
    mainView.removeLoaderSpinner()
  } catch (error) {
    if (error.name !== 'AbortError') {
      mainView.renderMessage(TYPE_MESSAGE.ERROR, MESSAGE.ERROR_DEFAULT, true)
      mainView.removeLoaderSpinner()
    }
  }
}
