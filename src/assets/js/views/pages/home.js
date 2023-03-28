import Banner from '../components/Banner'
import GridCards from '../components/GridCards'

import Page from './Page'

class Home extends Page {
  _title = 'Destacados'
  _idSelector = 'section-productos'

  _generateMarkup() {
    return `
      ${Banner()}
      <section class="section-productos pt-lg pb-lg" id=${this._idSelector}>
        <div class="section-productos__container container">
        <h2 class="section-productos__title heading-2 text-center mb-sm">${
          this._title
        }</h2>
        ${GridCards(this._data)}
        </div>
      </section>
    `
  }
}

export default new Home()
