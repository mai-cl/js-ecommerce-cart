import loaderSpinnerView from '../views/loaderSpinnerView'
import productosPorCategoriaView from '../views/productosPorCategoriaView'
import error404View from '../views/error404View'
import cartView from '../views/cartView'
import model from '../model'

const onAddToCartBtnClick = async e => {
  if (!e.target.matches('.itemcard__btn')) return
  const btn = e.target
  const productId = btn.dataset.id

  await model.getProductById(productId)
  const addedItem = model.addToCart()
  cartView.updateCartUI(model.state.cart)
  console.log('// Item agregado', addedItem)
}

export const categoria = async () => {
  const pathname = location.pathname
  loaderSpinnerView.render()
  await model.getCategories()
  const categoria = model.state.categorias.find(
    categoria => categoria.pathname === pathname
  )

  if (!categoria) {
    loaderSpinnerView.remove()
    return error404View.render()
  }

  await model.getProductsByCategory(categoria.id)
  loaderSpinnerView.remove()
  productosPorCategoriaView.render({
    categoria: categoria.nombre,
    data: model.state.products,
  })
  productosPorCategoriaView.addHandler('click', onAddToCartBtnClick)
}
