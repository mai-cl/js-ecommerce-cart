import error404img from '../../../img/404.png'
import Page from './Page'

class Error404 extends Page {
  show() {
    this._parentElement.innerHTML = this._generateMarkup()
  }

  _generateMarkup() {
    return `
      <section class="section-error">
        <div class="section-error__container container">
          <div class="section-error__img">
            <img src=${error404img} alt="404 image"/>
          </div>
          <p class="section-error__message">No se encontró la página solicitada.</p>
        </div>
      </section>
    `
  }
}

export default new Error404()
