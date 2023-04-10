import InputText from "../components/InputText";
import messagesManager from "../utils/messagesManager";
import Page from "./Page";


class Checkout extends Page {
    _title = 'Confirmar compra'
    _idSelector = 'section-checkout'

    _inputs = [
        { label: 'Nombre y Apellido', name: 'name', type: 'text', isRequired: true },
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

    updateCheckoutSummary(cart) {
        this._data = cart
        if(this._data.items.length) {
            document.querySelector('.section-checkout__resumen').innerHTML = `
            <h3>Resumen del pedido</h3>
            <p>Subtotal: $${this._data.subtotal}</p>
            <p>Costo de envío: $0</p>
            <p>Total: $${this._data.subtotal} </p>
            `
        } else {
            console.log('render message')
            messagesManager.renderMessageOn(
                document.querySelector('.section-checkout__resumen'),
                'info',
                'No hay items en el carrito!',
                true
              )
        }
    }

    getFormData() {
        const {name, phone, email, confirmarEmail} = document.getElementById('checkout-form')
        return {
            name: name.value,
            phone: phone.value,
            email: email.value,
            confirmarEmail: confirmarEmail.value
        }
    }

    show(props) {
        this._data = props
        this._parentElement.insertAdjacentHTML('beforeend', this._generateMarkup())
        if(!this._data.items.length) {
            messagesManager.renderMessageOn(
                document.querySelector('.section-checkout__resumen'),
                'info',
                'No hay items en el carrito!',
                true
              )
        }
    }

    _generateMarkup() {
        return `
            <section class="section-checkout" id=${this._idSelector}>
            <div class="container section-checkout__container">
            <h2 class="heading-2 text-center mb-sm">${this._title}</h2>
            <div class="section-checkout__content">
                <form class="section-checkout__form" id="checkout-form">
                    <h3>Ingrese sus datos</h3>
                    ${this._inputs.map(input => InputText(input)).join('')}
                    <button class='btn section-checkout__submit-btn mt-sm' type="submit">Confirmar compra</button>
                </form>
                <div class="section-checkout__resumen">
                    <h3>Resumen del pedido</h3>
                    <p>Subtotal: $${this._data.subtotal}</p>
                    <p>Costo de envío: $0</p>
                    <p>Total: $${this._data.subtotal} </p>
                </div>
            </div>
            </div>
        </section>
        `
    }
}

export default new Checkout()
