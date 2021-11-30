import { globalState } from '../controller'
import { getProductsByCategory, getCategories } from '../api/Api'
import { error404 } from './404Controller'
import loaderSpinnerView from '../views/loaderSpinnerView'
import productosPorCategoriaView from '../views/productosPorCategoriaView'

export const categoria = async () => {
  const pathname = location.pathname
  loaderSpinnerView.render()
  globalState.categorias = await getCategories()
  const categoria = globalState.categorias.find(
    categoria => categoria.pathname === pathname
  )
  if (!categoria) return error404()

  globalState.products = await getProductsByCategory(categoria.id)
  loaderSpinnerView.remove()
  productosPorCategoriaView.render({
    categoria: categoria.nombre,
    data: globalState.products,
  })
}
