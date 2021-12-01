import { globalState } from '../controller'
import { getProducts } from '../api/Api'
import bannerView from '../views/bannerView'
import productosDestacadosView from '../views/productosDestacadosView'
import loaderSpinnerView from '../views/loaderSpinnerView'

export const home = async () => {
  loaderSpinnerView.render()
  globalState.products = await getProducts()
  loaderSpinnerView.remove()
  bannerView.render()
  productosDestacadosView.render(globalState.products)
}
