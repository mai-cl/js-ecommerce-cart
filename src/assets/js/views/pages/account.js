import Page from './Page'

class Account extends Page {
  _title = 'Mi cuenta'
  _idSelector = 'section-account'

  _generateMarkup() {
    return `
    <section class="section-account" id=${this._idSelector}>
      <div class="container section-account__container">
        <h2 class="heading-2 text-center mb-sm">${this._title}</h2>
        <div class="section-account__content">
          <div class="section-account__user-info">
            <h3>Datos personales</h3>
            <p>${this._data.user.displayName}</p>
            <p>${this._data.user.email}</p>
          </div>
          <div class="section-account__user-orders">
            <h3>Compras</h3>
            ${this._data.orders
              .map(
                order => `
              <p>${order.id}, ${order.totalCost}</p>
            `
              )
              .join('')}
          </div>
        </div>
      </div>
    </section>
    `
  }
}

export default new Account()
