import InputText from '../components/InputText'
import { Message } from '../components/Message'
import Page from './Page'

class Checkout extends Page {
  _title = 'Confirmar compra'
  _idSelector = 'section-checkout'

  _inputs = [
    {
      label: 'Nombre y Apellido',
      name: 'name',
      type: 'text',
      isRequired: true,
    },
    {
      label: 'Telefono',
      name: 'phone',
      type: 'text',
      isRequired: true,
    },
    { label: 'Email', name: 'email', type: 'email', isRequired: true },
    {
      label: 'Confirmar Email',
      name: 'confirmarEmail',
      type: 'email',
      isRequired: true,
    },
  ]

  getFormData() {
    const { name, phone, email, confirmarEmail } =
      document.getElementById('checkout-form')
    return {
      name: name.value,
      phone: phone.value,
      email: email.value,
      confirmarEmail: confirmarEmail.value,
    }
  }

  _generateMarkup() {
    return `
            <section class="section-checkout" id=${this._idSelector}>
            <div class="container section-checkout__container">
            <h2 class="heading-2 text-center mb-sm">${this._title}</h2>
            <div class="section-checkout__content">
                <form class="section-checkout__form" id="checkout-form">
                    <h3 class="mb-sm">Ingrese sus datos</h3>
                    ${this._inputs.map(input => InputText(input)).join('')}
                    <button class='btn btn--full-width section-checkout__submit-btn mt-sm' type="submit" ${
                      !this._data.items.length ? 'disabled' : ''
                    }>Confirmar compra</button>
                </form>
                <div class="section-checkout__resumen" id="section-checkout-summary">
                    ${
                      !this._data.items.length
                        ? Message('info', 'No hay items en el carrito!')
                        : `
                            <h3 class="mb-sm">Resumen del pedido</h3>
                            <div class="section-checkout__resumen-item"><span class="section-checkout__label">Subtotal:</span> <span>$${this._data.subtotal}</span></div>
                            <div class="section-checkout__resumen-item"><span class="section-checkout__label">Costo de envío:</span> <span>$0</span></div>
                            <div class="section-checkout__line"></div>
                            <div class="section-checkout__resumen-item section-checkout__resumen-item--main"><span class="section-checkout__label">Total:</span> <span>$${this._data.subtotal}</span></div>
                        `
                    }
                    
                </div>
            </div>
            </div>
        </section>
        `
  }
}

export default new Checkout()
