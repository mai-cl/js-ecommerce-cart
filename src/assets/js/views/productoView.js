import { breadCrumbsView } from './breadCrumbsView'

class ProductoView {
  render(item) {
    document
      .getElementById('main')
      .insertAdjacentHTML('beforeend', this.#generateMarkup(item))
  }

  #generateMarkup(item) {
    return `
      <section class="section-producto">
        <div class="section-producto__container container">
          ${breadCrumbsView({
            crumbs: [
              {
                name: item.categoria.nombre,
                pathname: item.categoria.pathname,
              },
            ],
            activeCrumb: { name: item.nombre },
            sectionClassname: 'section-producto__breadcrumbs',
          })}
          
          <div class="section-producto__img">
            <img src=${item.urlImage} alt=${item.nombre} />
          </div>
          <div class="section-producto__maininfo">
            <h2 class="section-producto__title heading-2">
              ${item.nombre}
            </h2>
            <div class="section-producto__stock">${
              item.stock ? 'Stock Disponible' : 'Sin Stock'
            }</div>
            <div class="section-producto__price">$${item.precio}</div>
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
              ${this.#generateSpecsMarkup(item.especificaciones)}
            </div>
          </div>
        </div>
      </section>
    `
  }

  #generateSpecsMarkup(specs) {
    return specs
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
  }
}

export default new ProductoView()