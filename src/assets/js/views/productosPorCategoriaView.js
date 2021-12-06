import { breadCrumbsView } from './breadCrumbsView'
import gridCardsView from './gridCardsView'

class ProductosPorCategoriaView {
  #emptyDataMsg = 'Proximamente'

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

  #generateMarkup({ categoria, data }) {
    return `
      <section class="section-productos">
        <div class="section-productos__container container">
          ${breadCrumbsView({
            crumbs: [],
            activeCrumb: {
              name: categoria,
            },
            sectionClassname: 'mb-xs',
          })}
          ${
            data.length !== 0
              ? `<h2 class="section-productos__title heading-2 mb-sm">${categoria}</h2>`
              : ''
          }
          ${
            data.length !== 0
              ? gridCardsView(data)
              : `
              <p class="section-productos__message">${this.#emptyDataMsg}</p>
              `
          }
        </div>
      </section>
    `
  }
}

export default new ProductosPorCategoriaView()
