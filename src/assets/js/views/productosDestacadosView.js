import gridCardsView from './gridCardsView'
import messageView from './messageView'

class ProductosDestacadosView {
  #title = 'Destacados'

  addHandler(event, handler) {
    document
      .querySelector('.section-productos')
      .addEventListener(event, handler)
  }

  render(data) {
    document
      .getElementById('main')
      .insertAdjacentHTML('beforeend', this.#generateMarkup(data))
  }

  showSuccessAddToCartMsj() {
    messageView.renderSuccessMessage('Producto agregado al carrito!')
  }

  messageContainer() {
    return document.querySelector('.messages')
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
