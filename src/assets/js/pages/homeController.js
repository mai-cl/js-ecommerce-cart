import { globalState, router, $content } from '../App'
import Banner from '../components/Banner'
import ProductosDestacados from '../components/ProductosDestacados'
import bannerImg from '../../img/banner.jpg'
import { getProducts } from '../api/Api'

export const home = async () => {
  let homeMarkup = ''
  homeMarkup += new Banner([bannerImg]).markup()
  globalState.products = await getProducts()
  homeMarkup += new ProductosDestacados('Destacados').markup()
  $content.innerHTML = homeMarkup
}
