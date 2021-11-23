export default class ProductoCard {
  constructor({
    id,
    categoria,
    stock,
    nombre,
    pathParam,
    precio,
    descripcion,
    urlImage,
  }) {
    this.id = id
    this.categoria = categoria.pathname
    this.stock = stock
    this.nombre = nombre
    this.pathParam = pathParam
    this.precio = precio
    this.descripcion = descripcion
    this.urlImage = urlImage
  }

  markup() {
    return `
      <div class="itemcard">
        <a class="itemcard__img navlink" href="${this.categoria}/${this.pathParam}">
          <img
            src=${this.urlImage}
            alt=${this.nombre}
          />
        </a>
        <div class="itemcard__body">
          <a href="${this.categoria}/${this.pathParam}" class="itemcard__linktitle navlink">
            <h3 class="itemcard__title">
              ${this.nombre}
            </h3>
          </a>
          <div class="itemcard__price">$${this.precio}</div>
          <button class="itemcard__btn btn">Sumar al carrito</button>
        </div>
      </div>
    `
  }
}
