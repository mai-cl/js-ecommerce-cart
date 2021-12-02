import loaderSpinnerView from '../views/loaderSpinnerView'
import productosPorCategoriaView from '../views/productosPorCategoriaView'
import error404View from '../views/error404View'
import model from '../model'

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
}
