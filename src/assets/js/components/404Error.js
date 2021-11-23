import error404img from '../../img/404.png'

export default class Error404 {
  constructor() {
    this.img = error404img
  }
  markup() {
    return `
    <section class="section-error">
    <div class="section-error__container container">
      <div class="section-error__img">
        <img src=${this.img} alt="404 image"/>
      </div>
      <p class="section-error__message">No se encontró la página solicitada.</p>
    </div>
  </section>
    `
  }
}
