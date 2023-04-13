import { getFormatDate } from '../../utils/date'
import messagesManager from '../utils/messagesManager'
import Page from './Page'

class Account extends Page {
  _title = 'Mi cuenta'
  _idSelector = 'section-account'


  show(props) {
    this._data = props
    this._parentElement.insertAdjacentHTML('beforeend', this._generateMarkup())
    if(!this._data.orders.length) {
        messagesManager.renderMessageOn(
            document.querySelector('.section-account__user-orders-list'),
            'info',
            'Aún no ha realizado compras en el sitio!',
            true
          )
    }
}

  _generateMarkup() {
    return `
    <section class="section-account" id=${this._idSelector}>
      <div class="container section-account__container">
        <h2 class="heading-2 text-center mb-sm">${this._title}</h2>
        <div class="section-account__content">
          <div class="section-account__user-info">
            <h3 class="mb-sm">Datos personales</h3>
            <p>${this._data.user.displayName}</p>
            <p>${this._data.user.email}</p>
          </div>
          <div class="section-account__user-orders">
            <h3 class="mb-sm">Compras</h3>
            <ul class="section-account__user-orders-list">
              ${this._data.orders
                .map(
                  order => `
                
                <li class="user-orders-card">
                  <div class="user-orders-card__header">
                    <h4>Orden: #${order.id}</h4>
                    <span>${getFormatDate(order.date)}</span>
                  </div>
                  <div class="user-orders-card__body">
                    <p class="user-orders-card__item">
                    <i class="fa-solid fa-circle-info"></i><span class="label">Estado:</span> Pagado
                    </p>
                    <p class="user-orders-card__item">
                    <i class="fa-solid fa-truck"></i><span class="label">Envío:</span> Enviado
                    </p>
                    <p class="user-orders-card__item user-orders-card__item--main mt-sm">Total $${order.totalCost}</p>
                  </div>
                </li>
              `
                )
                .join('')}
            </ul>
          </div>
        </div>
      </div>
    </section>
    `
  }
}

export default new Account()
