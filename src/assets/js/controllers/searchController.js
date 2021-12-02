import model from '../model'
import error404View from '../views/error404View'
import loaderSpinnerView from '../views/loaderSpinnerView'
import searchProductosView from '../views/searchProductosView'

const getQueryValue = () => {
  const result = location.search.match(/query=([^&]*)/)
  return result ? result[1] : null
}

export const search = async () => {
  const query = getQueryValue()
  if (!query) return error404View.render()
  loaderSpinnerView.render()
  await model.getProductsByQuery(query)
  loaderSpinnerView.remove()
  searchProductosView.render({ query, data: model.state.products })
}
