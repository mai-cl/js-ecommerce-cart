import Swiper, { Autoplay, Navigation, Pagination } from 'swiper'
import Banner from '../components/Banner'
import GridCards from '../components/GridCards'

import Page from './Page'

class Home extends Page {
  _title = 'Destacados'
  _idSelector = 'section-productos'

  _generateMarkup() {
    return `
      ${Banner(this._data.bannerData)}
      <section class="section-productos pt-lg pb-lg" id=${this._idSelector}>
        <div class="section-productos__container container">
        <h2 class="section-productos__title heading-2 text-center mb-sm">${
          this._title
        }</h2>
        ${GridCards(this._data.products)}
        </div>
      </section>
    `
  }

  initCarousel() {
    const swiper = new Swiper('.swiper', {
      modules: [Navigation, Pagination, Autoplay],

      direction: 'horizontal',
      loop: true,

      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },

      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    })
  }
}

export default new Home()
