import gridCardsView from '../views/gridCardsView'

class SearchProductosView {
  render(props) {
    document
      .getElementById('main')
      .insertAdjacentHTML('beforeend', this.#generateMarkup(props))
  }

  #generateMarkup({ query, data }) {
    return `
      <section class="section-destacados">
        <div class="section-destacados__container container">
        <h2 class="section-destacados__title heading-2">${
          data.length === 0 ? 'No hay resultados para' : 'Resultados para'
        } "${query}"</h2>
        ${gridCardsView(data)}
        </div>
      </section>
    `
  }
}

export default new SearchProductosView()
