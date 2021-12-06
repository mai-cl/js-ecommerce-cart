import model from '../model'
import bannerView from '../views/bannerView'
import productosDestacadosView from '../views/productosDestacadosView'
import loaderSpinnerView from '../views/loaderSpinnerView'
import cartView from '../views/cartView'

const onAddToCartBtnClick = async e => {
  if (!e.target.matches('.itemcard__btn')) return
  const btn = e.target
  const productId = btn.dataset.id

  await model.getProductById(productId)
  const addedItem = model.addToCart()
  cartView.updateCartUI(model.state.cart)
  console.log('// Item agregado', addedItem)
}

export const home = async () => {
  loaderSpinnerView.render()
  await model.getProducts()
  loaderSpinnerView.remove()
  bannerView.render()
  productosDestacadosView.render(model.state.products)
  productosDestacadosView.addHandler('click', onAddToCartBtnClick)
}
