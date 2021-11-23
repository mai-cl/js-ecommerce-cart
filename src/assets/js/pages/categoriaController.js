import { $content, globalState } from '../App'
import Breadcrumbs from '../components/Breadcrumbs'
import { getProductsByCategory, getCategories } from '../api/Api'
import ProductoCard from '../components/ProductoCard'
import { error404 } from './404Controller'

export const categoria = async () => {
  const pathname = location.pathname

  globalState.categorias = await getCategories()

  const categoria = globalState.categorias.find(
    categoria => categoria.pathname === pathname
  )

  if (!categoria) return error404()

  let breadcrumbsMarkup = ''
  breadcrumbsMarkup += new Breadcrumbs({
    crumbs: [],
    activeCrumb: {
      name: categoria.nombre,
    },
    sectionClassname: 'section-categoria__breadcrumbs',
  }).markup()

  globalState.products = await getProductsByCategory(categoria.id)

  let productsMarkup = ''
  let categoriaMarkup = ''

  console.log(globalState.products.length)

  if (globalState.products.length !== 0) {
    categoriaMarkup += `<h2 class="section-categoria__title heading-2">${categoria.nombre}</h2>`
    globalState.products.forEach(product => {
      productsMarkup += new ProductoCard(product).markup()
    })
    $content.innerHTML = `
    <section class="section-categoria">
      <div class="section-categoria__container container">
        ${breadcrumbsMarkup}
        ${categoriaMarkup}
        <div class="grid-productos">
          ${productsMarkup}
        </div>
      </div>
    </section>
  `
  } else {
    $content.innerHTML = `
    <section class="section-categoria">
    <div class="section-categoria__container container">
    ${breadcrumbsMarkup}
      <p class="section-categoria__message">Próximamente</p>
    </div>
  </section>
    `
  }
}
