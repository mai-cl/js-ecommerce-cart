class LoaderSpinnerView {
  render() {
    document.getElementById('main').innerHTML = this.#generateMarkup()
  }

  remove() {
    document.querySelector('.loader-spinner').remove()
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
