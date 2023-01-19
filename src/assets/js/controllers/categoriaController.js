import loaderSpinnerView from '../views/loaderSpinnerView'
import productosPorCategoriaView from '../views/productosPorCategoriaView'
import error404View from '../views/error404View'
import cartView from '../views/cartView'
import model from '../model'
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

    model.addToCart()
    cartView.updateCartUI(model.state.cart)
    messageView.renderMessageOn(
      productosPorCategoriaView.messageContainer(),
      'success',
      'Producto agregado al carrito!'
    )
  } catch (error) {
    messageView.renderMessageOn(
      productosPorCategoriaView.messageContainer(),
      'error',
      error.message
    )
  } finally {
    loaderSpinnerView.removeTop()
  }
}

export const categoria = async () => {
  const pathname = location.pathname
  model.abortIncomingRequest()
  messageView.removeMessageOn(productosPorCategoriaView.messageContainer())
  loaderSpinnerView.render()

  try {
    await model.getCategories()
    const categoria = model.state.categorias.find(
      categoria => categoria.pathname === pathname
    )

    await model.getProductsByCategory(categoria.id)
    productosPorCategoriaView.render({
      categoria: categoria.nombre,
      data: model.state.products,
    })
    productosPorCategoriaView.addHandler('click', onAddToCartBtnClick)
    loaderSpinnerView.remove()
  } catch (error) {
    if (error.name !== 'AbortError') {
      messageView.renderMessageOn(
        productosPorCategoriaView.messageContainer(),
        'error',
        'Ha ocurrido un error inesperado. Inténtelo nuevamente.',
        true
      )
      loaderSpinnerView.remove()
    }
  }
}
