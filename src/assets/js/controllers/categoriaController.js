import { globalState } from '../controller'
import { getProductsByCategory, getCategories } from '../api/Api'
import loaderSpinnerView from '../views/loaderSpinnerView'
import productosPorCategoriaView from '../views/productosPorCategoriaView'
import error404View from '../views/error404View'

export const categoria = async () => {
  const pathname = location.pathname
  loaderSpinnerView.render()
  globalState.categorias = await getCategories()
  const categoria = globalState.categorias.find(
    categoria => categoria.pathname === pathname
  )

  if (!categoria) {
    loaderSpinnerView.remove()
    return error404View.render()
  }

  globalState.products = await getProductsByCategory(categoria.id)
  loaderSpinnerView.remove()
  productosPorCategoriaView.render({
    categoria: categoria.nombre,
    data: globalState.products,
  })
}
