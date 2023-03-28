import { BreadCrumbs } from '../components/BreadCrumbs'
import GridCards from '../components/GridCards'
import Page from './Page'

class Categoria extends Page {
  _emptyDataMsg = 'Proximamente'
  _idSelector = 'section-productos'

  _generateMarkup() {
    const { categoria, data } = this._data
    return `
      <section class="section-productos" id=${this._idSelector}>
        <div class="section-productos__container container">
          ${BreadCrumbs({
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
              ? GridCards(data)
              : `
              <p class="section-productos__message">${this._emptyDataMsg}</p>
              `
          }
        </div>
      </section>
    `
  }
}

export default new Categoria()
