export default class Banner {
  constructor(urls) {
    this.urls = urls
  }
  markup() {
    let markup = ''
    this.urls.forEach(url => {
      markup += `
        <img src=${url} alt="Main Banner" />
      `
    })
    return `
      <section class="slider">
        ${markup}
      </section>
    `
  }
}
