import model from '../model'
import loaderSpinnerView from '../views/loaderSpinnerView'
import productoView from '../views/productoView'
import error404View from '../views/error404View'

export const producto = async pathParam => {
  loaderSpinnerView.render()
  await model.getProductByPathparam(pathParam)
  loaderSpinnerView.remove()

  if (!model.state.targetProduct) return error404View.render()

  productoView.render(model.state.targetProduct)
}
