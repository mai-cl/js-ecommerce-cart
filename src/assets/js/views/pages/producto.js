import { BreadCrumbs } from '../components/BreadCrumbs'

import Page from './Page'

class Producto extends Page {
  _idSelector = 'section-producto'

  increaseQty() {
    document.querySelector('.qty-selector__input').value++
  }

  decreaseQty() {
    const input = document.querySelector('.qty-selector__input')
    if (parseInt(input.value) === 1) return
    input.value--
  }

  getInputQty() {
    return parseInt(document.querySelector('.qty-selector__input').value)
  }

  _generateMarkup() {
    const { categoria, nombre, urlImage, stock, precio, id, especificaciones } =
      this._data
    return `
      <section class="section-producto" id=${this._idSelector}>
        <div class="section-producto__container container">
          ${BreadCrumbs({
            crumbs: [
              {
                name: categoria.nombre,
                pathname: categoria.pathname,
              },
            ],
            activeCrumb: { name: nombre },
            sectionClassname: 'section-producto__breadcrumbs',
          })}
          
          <div class="section-producto__img">
            <img src=${urlImage} alt=${nombre} />
          </div>
          <div class="section-producto__maininfo">
            <h2 class="section-producto__title heading-2">
              ${nombre}
            </h2>
            <div class="section-producto__stock">${
              stock ? 'Stock Disponible' : 'Sin Stock'
            }</div>
            <div class="section-producto__price">$${precio}</div>
            <div class="section-producto__areabtn">
              <div class="qty-selector">
                <button class="qty-selector__btn qty-selector__btn--dec" data-action="decreaseQty">
                  -
                </button>
                <input
                  class="qty-selector__input"
                  type="number"
                  name="quantity"
                  id="quantity"
                  readonly
                  min="1"
                  max="10"
                  value="1"
                />
                <button class="qty-selector__btn qty-selector__btn--inc" data-action="increaseQty">
                  +
                </button>
              </div>
              <button class="btn section-producto__btn" data-id="${id}">
                Sumar al carrito
              </button>
            </div>
          </div>
          <div class="section-producto__description">
            <h3>Especificaciones del Producto</h3>
            <div class="specs">
              ${this._generateSpecsMarkup(especificaciones)}
            </div>
          </div>
        </div>
      </section>
    `
  }

  _generateSpecsMarkup(specs) {
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

export default new Producto()
