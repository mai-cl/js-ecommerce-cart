import model from '../model'
import error404View from '../views/error404View'
import loaderSpinnerView from '../views/loaderSpinnerView'
import searchProductosView from '../views/searchProductosView'
import cartView from '../views/cartView'
import messageView from '../views/messageView'

const getQueryValue = () => {
  const result = location.search.match(/query=([^&]*)/)
  return result ? result[1] : null
}

const onAddToCartBtnClick = async e => {
  if (!e.target.matches('.itemcard__btn')) return
  const btn = e.target
  const productId = btn.dataset.id
  loaderSpinnerView.renderTop()

  try {
    await model.getProductById(productId)

    if (model.state.targetProduct.stock < model.getItemQtyInCart(productId) + 1)
      throw new Error('No hay stock suficiente!')

    const addedItem = model.addToCart()
    cartView.updateCartUI(model.state.cart)

    messageView.renderMessageOn(
      searchProductosView.messageContainer(),
      'success',
      'Producto agregado al carrito!'
    )
  } catch (error) {
    messageView.renderMessageOn(
      searchProductosView.messageContainer(),
      'error',
      error.message
    )
  } finally {
    loaderSpinnerView.removeTop()
  }
}

export const search = async () => {
  const query = getQueryValue()
  if (!query) return error404View.render()
  loaderSpinnerView.render()
  messageView.removeMessageOn(searchProductosView.messageContainer())

  try {
    await model.getProductsByQuery(query)
    searchProductosView.render({ query, data: model.state.products })
    searchProductosView.addHandler('click', onAddToCartBtnClick)
  } catch (error) {
    messageView.renderMessageOn(
      searchProductosView.messageContainer(),
      'error',
      error.message,
      true
    )
  } finally {
    loaderSpinnerView.remove()
  }
}
