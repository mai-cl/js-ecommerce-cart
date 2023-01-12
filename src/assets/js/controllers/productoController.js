import model from '../model'
import loaderSpinnerView from '../views/loaderSpinnerView'
import productoView from '../views/productoView'
import cartView from '../views/cartView'
import error404View from '../views/error404View'
import Router from '../Router'
import messageView from '../views/messageView'

const onAddToCartBtnClick = async e => {
  if (!e.target.matches('.section-producto__btn')) return
  const btn = e.target
  const productId = btn.dataset.id
  const qty = productoView.getInputQty()

  loaderSpinnerView.renderTop()

  try {
    await model.getProductById(productId)

    if (
      model.state.targetProduct.stock <
      qty + model.getItemQtyInCart(productId)
    ) {
      throw new Error('No hay stock suficiente!')
    }

    model.addToCart(qty)
    cartView.updateCartUI(model.state.cart)
    messageView.renderMessageOn(
      productoView.messageContainer(),
      'success',
      'Producto agregado al carrito!'
    )
  } catch (error) {
    messageView.renderMessageOn(
      productoView.messageContainer(),
      'error',
      error.message
    )
  } finally {
    loaderSpinnerView.removeTop()
  }
}

const onControlInputClick = e => {
  if (!e.target.matches('.qty-selector__btn')) return
  const button = e.target
  productoView[button.dataset.action]()
}

export const producto = async () => {
  loaderSpinnerView.render()
  messageView.removeMessageOn(productoView.messageContainer())

  try {
    await model.getProductByPathparam(Router.dynamicParams.productSlug)
    if (!model.state.targetProduct) return error404View.render()
    productoView.render(model.state.targetProduct)
    productoView.addHandler('click', onControlInputClick)
    productoView.addHandler('click', onAddToCartBtnClick)
  } catch (error) {
    messageView.renderMessageOn(
      productoView.messageContainer(),
      'error',
      error.message,
      true
    )
  } finally {
    loaderSpinnerView.remove()
  }
}
