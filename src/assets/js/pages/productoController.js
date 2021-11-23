import { $content } from '../App'
import { getProductByPathparam } from '../api/Api'
import Breadcrumbs from '../components/Breadcrumbs'
import { error404 } from './404Controller'

const renderSpecs = specs =>
  specs
    .map(
      specType => `
      <div class="specs__section">
        <h4 class="specs__title">${specType.type}</h4>
        ${specType.items
          .map(
            specItem =>
              `<div class="specs__item"><span class="specs__item-name">${specItem.name}:</span>&nbsp;<span class="specs__item-value">${specItem.value}</span></div>`
          )
          .join('')}
      </div>
    `
    )
    .join('')

export const producto = async () => {
  const pathParam = location.pathname.split('/').slice(2).reverse()[0]
  const [producto] = await getProductByPathparam(pathParam)

  if (!producto) return error404()

  $content.innerHTML = `
  <section class="section-producto">
  <div class="section-producto__container container">
    ${new Breadcrumbs({
      crumbs: [
        {
          name: producto.categoria.nombre,
          pathname: producto.categoria.pathname,
        },
      ],
      activeCrumb: { name: producto.nombre },
      sectionClassname: 'section-producto__breadcrumbs',
    }).markup()}
    
    <div class="section-producto__img">
      <img src=${producto.urlImage} alt=${producto.nombre} />
    </div>
    <div class="section-producto__maininfo">
      <h2 class="section-producto__title heading-2">
        ${producto.nombre}
      </h2>
      <div class="section-producto__stock">${
        producto.stock ? 'Stock Disponible' : 'Sin Stock'
      }</div>
      <div class="section-producto__price">$${producto.precio}</div>
      <div class="section-producto__areabtn">
        <div class="qty-selector">
          <button class="qty-selector__btn">-</button>
          <input
            class="qty-selector__input"
            type="number"
            name="quantity"
            id="quantity"
            readonly
            min="1"
            max="6"
            value="1"
          />
          <button class="qty-selector__btn">+</button>
        </div>
        <button class="btn section-producto__btn">
          Sumar al carrito
        </button>
      </div>
    </div>
    <div class="section-producto__description">
      <h3>Especificaciones del Producto</h3>
      <div class="specs">
        ${renderSpecs(producto.especificaciones)}
      </div>
      </div>
  </div>
</section>
  `
}
