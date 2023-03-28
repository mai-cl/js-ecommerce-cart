import Page from './Page'
import GridCards from '../components/GridCards'

class SearchProductos extends Page {
  _idSelector = 'section-productos'

  _generateMarkup() {
    const { query, data } = this._data

    return `
        <section class="section-productos" id=${this._idSelector}>
          <div class="section-productos__container container">
          <h2 class="section-productos__title heading-2 text-center mb-sm">${
            data.length === 0 ? 'No hay resultados para' : 'Resultados para'
          } "${query}"</h2>
          ${GridCards(data)}
          </div>
        </section>
      `
  }
}

export default new SearchProductos()
