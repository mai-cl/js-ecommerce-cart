class LoaderSpinnerView {
  render() {
    document.getElementById('main').innerHTML = this.#generateMarkup()
  }

  renderTop() {
    document
      .querySelector('body')
      .insertAdjacentHTML('beforeend', this.#generateMarkup())
    document
      .querySelector('body > .loader-spinner')
      .classList.add('loader-spinner--pos-absolute')
  }

  remove() {
    document.querySelector('.loader-spinner').remove()
  }

  removeTop() {
    document.querySelector('body > .loader-spinner').remove()
  }

  #generateMarkup() {
    return `
      <div class="loader-spinner">
        <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
      </div>
    `
  }
}

export default new LoaderSpinnerView()
