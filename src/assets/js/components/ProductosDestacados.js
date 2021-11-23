import ProductoCard from './ProductoCard'
import { globalState } from '../App'

export default class ProductosDestacados {
  constructor(title) {
    this.title = title
  }

  markup() {
    let productItemsMarkup = ''
    globalState.products.forEach(product => {
      productItemsMarkup += new ProductoCard(product).markup()
    })

    return `
    <section class="section-destacados">
    <div class="section-destacados__container container">
      <h2 class="section-destacados__title heading-2">${this.title}</h2>
      <div class="grid-productos">
        ${productItemsMarkup}
      </div>
    </div>
  </section>
    `
  }
}
