import gridCardsView from './gridCardsView'

class ProductosDestacadosView {
  #title = 'Destacados'

  render(data) {
    document
      .getElementById('main')
      .insertAdjacentHTML('beforeend', this.#generateMarkup(data))
  }

  #generateMarkup(data) {
    return `
      <section class="section-productos pt-lg pb-lg">
        <div class="section-productos__container container">
        <h2 class="section-productos__title heading-2 text-center mb-sm">${
          this.#title
        }</h2>
        ${gridCardsView(data)}
        </div>
      </section>
    `
  }
}

export default new ProductosDestacadosView()
