import bannerImg from '../../../img/banner.jpg'

function Banner() {
  const urls = [bannerImg]

  return `
  <section class="slider">
    ${urls.map((url, i) => `<img src=${url} alt=${'image-' + i} />`).join('')}
  </section>
`
}

export default Banner
