import { breadCrumbsView } from './breadCrumbsView'
import gridCardsView from './gridCardsView'

class ProductosPorCategoriaView {
  #emptyDataMsg = 'Proximamente'

  render(props) {
    document
      .getElementById('main')
      .insertAdjacentHTML('beforeend', this.#generateMarkup(props))
  }

  #generateMarkup({ categoria, data }) {
    return `
      <section class="section-categoria">
        <div class="section-categoria__container container">
          ${breadCrumbsView({
            crumbs: [],
            activeCrumb: {
              name: categoria,
            },
            sectionClassname: 'section-categoria__breadcrumbs',
          })}
          ${
            data.length !== 0
              ? `<h2 class="section-categoria__title heading-2">${categoria}</h2>`
              : ''
          }
          ${
            data.length !== 0
              ? gridCardsView(data)
              : `
              <p class="section-categoria__message">${this.#emptyDataMsg}</p>
              `
          }
        </div>
      </section>
    `
  }
}

export default new ProductosPorCategoriaView()
