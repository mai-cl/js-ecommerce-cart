import gridCardsView from '../views/gridCardsView'

class SearchProductosView {
  addHandler(event, handler) {
    document
      .querySelector('.section-productos')
      .addEventListener(event, handler)
  }

  render(props) {
    document
      .getElementById('main')
      .insertAdjacentHTML('beforeend', this.#generateMarkup(props))
  }

  #generateMarkup({ query, data }) {
    return `
      <section class="section-productos">
        <div class="section-productos__container container">
        <h2 class="section-productos__title heading-2 text-center mb-sm">${
          data.length === 0 ? 'No hay resultados para' : 'Resultados para'
        } "${query}"</h2>
        ${gridCardsView(data)}
        </div>
      </section>
    `
  }
}

export default new SearchProductosView()
