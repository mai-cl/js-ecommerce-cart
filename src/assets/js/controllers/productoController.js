import model from '../model'
import loaderSpinnerView from '../views/loaderSpinnerView'
import productoView from '../views/productoView'
import cartView from '../views/cartView'
import error404View from '../views/error404View'

const onAddToCartBtnClick = async e => {
  if (!e.target.matches('.section-producto__btn')) return
  const btn = e.target
  const productId = btn.dataset.id
  const qty = productoView.getInputQty()
  loaderSpinnerView.renderTop()
  await model.getProductById(productId)
  loaderSpinnerView.removeTop()
  const addedItem = model.addToCart(qty)
  cartView.updateCartUI(model.state.cart)
  console.log('// Item agregado', addedItem)
  productoView.showSuccessAddToCartMsj()
}

const onControlInputClick = e => {
  if (!e.target.matches('.qty-selector__btn')) return
  const button = e.target
  productoView[button.dataset.action]()
}

export const producto = async pathParam => {
  loaderSpinnerView.render()
  await model.getProductByPathparam(pathParam)
  loaderSpinnerView.remove()

  if (!model.state.targetProduct) return error404View.render()

  productoView.render(model.state.targetProduct)
  productoView.addHandler('click', onControlInputClick)
  productoView.addHandler('click', onAddToCartBtnClick)
}
