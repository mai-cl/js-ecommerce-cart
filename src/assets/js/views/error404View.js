import error404img from '../../img/404.png'

class Error404View {
  render() {
    document.getElementById('main').innerHTML = this.#generateMarkup()
  }

  #generateMarkup() {
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

export default new Error404View()
