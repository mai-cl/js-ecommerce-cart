import bannerImg from '../../img/banner.jpg'

class BannerView {
  #urls = [bannerImg]

  render() {
    document
      .getElementById('main')
      .insertAdjacentHTML('beforeend', this.#generateMarkup())
  }

  #generateMarkup() {
    return `
      <section class="slider">
        ${this.#urls
          .map((url, i) => `<img src=${url} alt=${'image-' + i} />`)
          .join('')}
      </section>
    `
  }
}

export default new BannerView()
