import model from '../model'
import bannerView from '../views/bannerView'
import productosDestacadosView from '../views/productosDestacadosView'
import loaderSpinnerView from '../views/loaderSpinnerView'
import cartView from '../views/cartView'
import messageView from '../views/messageView'

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
      productosDestacadosView.messageContainer(),
      'success',
      'Producto agregado al carrito!'
    )
  } catch (error) {
    messageView.renderMessageOn(
      productosDestacadosView.messageContainer(),
      'error',
      error.message
    )
  } finally {
    loaderSpinnerView.removeTop()
  }
}

export const home = async () => {
  model.abortIncomingRequest()
  messageView.removeMessageOn(productosDestacadosView.messageContainer())
  loaderSpinnerView.render()

  try {
    await model.getProducts()
    bannerView.render()
    productosDestacadosView.render(model.state.products)
    productosDestacadosView.addHandler('click', onAddToCartBtnClick)
    loaderSpinnerView.remove()
  } catch (error) {
    if (error.name !== 'AbortError') {
      messageView.renderMessageOn(
        productosDestacadosView.messageContainer(),
        'error',
        'Ha ocurrido un error inesperado. Inténtelo nuevamente.',
        true
      )
      loaderSpinnerView.remove()
    }
  }
}
