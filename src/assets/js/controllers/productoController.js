import { getProductByPathparam } from '../api/Api'
import loaderSpinnerView from '../views/loaderSpinnerView'
import productoView from '../views/productoView'
import error404View from '../views/error404View'

export const producto = async pathParam => {
  /* const pathParam = location.pathname.split('/').slice(2).reverse()[0] */

  console.log(pathParam)

  loaderSpinnerView.render()
  const [producto] = await getProductByPathparam(pathParam)
  loaderSpinnerView.remove()

  if (!producto) return error404View.render()

  productoView.render(producto)
}
