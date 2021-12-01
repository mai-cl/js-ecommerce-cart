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
      <section class="section-destacados">
        <div class="section-destacados__container container">
        <h2 class="section-destacados__title heading-2">${this.#title}</h2>
        ${gridCardsView(data)}
        </div>
      </section>
    `
  }
}

export default new ProductosDestacadosView()
