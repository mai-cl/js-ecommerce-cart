import model from '../model'
import error404View from '../views/error404View'
import loaderSpinnerView from '../views/loaderSpinnerView'
import searchProductosView from '../views/searchProductosView'
import cartView from '../views/cartView'

const getQueryValue = () => {
  const result = location.search.match(/query=([^&]*)/)
  return result ? result[1] : null
}

const onAddToCartBtnClick = async e => {
  if (!e.target.matches('.itemcard__btn')) return
  const btn = e.target
  const productId = btn.dataset.id

  await model.getProductById(productId)
  const addedItem = model.addToCart()
  cartView.updateCartUI(model.state.cart)
  console.log('// Item agregado', addedItem)
}

export const search = async () => {
  const query = getQueryValue()
  if (!query) return error404View.render()
  loaderSpinnerView.render()
  await model.getProductsByQuery(query)
  loaderSpinnerView.remove()
  searchProductosView.render({ query, data: model.state.products })
  searchProductosView.addHandler('click', onAddToCartBtnClick)
}
