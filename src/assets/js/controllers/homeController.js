import model from '../model'
import bannerView from '../views/bannerView'
import productosDestacadosView from '../views/productosDestacadosView'
import loaderSpinnerView from '../views/loaderSpinnerView'

export const home = async () => {
  loaderSpinnerView.render()
  await model.getProducts()
  loaderSpinnerView.remove()
  bannerView.render()
  productosDestacadosView.render(model.state.products)
}
