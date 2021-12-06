function gridCardsView(data) {
  return `
    <div class="grid-productos">
      ${data
        .map(
          item => `
        <div class="itemcard">
          <a class="itemcard__img navlink" href="${item.categoria.pathname}/${item.pathParam}">
            <img
              src="${item.urlImage}"
              alt="${item.nombre}"
            />
          </a>
          <div class="itemcard__body">
            <a href="${item.categoria.pathname}/${item.pathParam}" class="itemcard__linktitle navlink">
              <h3 class="itemcard__title">
                ${item.nombre}
              </h3>
            </a>
            <div class="itemcard__price">$${item.precio}</div>
            <button class="itemcard__btn btn" data-id="${item.id}">Sumar al carrito</button>
          </div>
        </div>
      `
        )
        .join('')}
    </div>
  `
}

export default gridCardsView
