import LoaderSpinner from '../components/LoaderSpinner'
import messageManager from '../utils/messagesManager'

const cart = document.querySelector('.cart')
const cartMessages = document.querySelector('.cart__messages')
const cartBodyContainer = document.querySelector('.cart__body .container')
const openCartBtn = document.getElementById('open-cart-btn')
const closeCartBtn = document.getElementById('close-cart-btn')
const body = document.querySelector('body')

function setUIhandlers() {
  openCartBtn.addEventListener('click', () => {
    cart.classList.add('show')
  })

  closeCartBtn.addEventListener('click', () => {
    cart.classList.remove('show')
  })

  cart.addEventListener('click', e => {
    if (e.target.matches('.cart__modal, .cart__modal *')) return
    cart.classList.remove('show')
  })
}

function renderLoaderSpinner() {
  body.insertAdjacentHTML('beforeend', `${LoaderSpinner(true)}`)
}

function removeLoaderSpinner() {
  const spinner = body.querySelector('.loader-spinner')
  if (spinner) spinner.remove()
}

function closeCart() {
  cart.classList.remove('show')
}

function addHandler(event, handler) {
  cart.addEventListener(event, handler)
}

function cleanContainer() {
  Array.from(
    cartBodyContainer.querySelectorAll(
      ':not(.cart__messages, .cart__messages *)'
    )
  ).map(element => element.remove())
}

function updateCartUI(data) {
  cleanContainer()
  if (data.items.length === 0) {
    messageManager.renderMessageOn(
      cartMessages,
      'info',
      'No hay items en el carrito!',
      true
    )
    return
  }
  messageManager.removeMessageOn(cartMessages)
  cartBodyContainer.insertAdjacentHTML('beforeend', generateMarkup(data))
}

function getInputQty(itemId) {
  return parseInt(
    document.querySelector(
      `.cart-item[data-id="${itemId}"] .qty-selector__input`
    ).value
  )
}

function increaseQty(itemId) {
  cart.querySelector(`.cart-item[data-id="${itemId}"] .qty-selector__input`)
    .value++
}

function decreaseQty(itemId) {
  const input = cart.querySelector(
    `.cart-item[data-id="${itemId}"] .qty-selector__input`
  )
  if (parseInt(input.value) === 1) return
  input.value--
}

function renderMessage(type, text) {
  messageManager.renderMessageOn(cartMessages, type, text)
}

function generateMarkup(data) {
  const { items, subtotal, quantity } = data
  return `
    <ul class="cart__list mb-sm">
      ${generateMarkupItems(items)}
    </ul>
    <hr class="mb-sm" />
    <div class="cart__subtotal mb-sm">
      <span class="cart__subtotal-label">Subtotal:</span>
      <span class="cart__subtotal-value">$${subtotal}</span>
    </div>
    <hr class="mb-md" />
    <a class="cart__main-btn btn btn--full-width" href="/checkout">
      Iniciar Compra
    </a>
  `
}

function generateMarkupItems(data) {
  return data
    .map(
      item => `
  <li class="cart-item" data-id=${item.id}>
    <button class="cart-item__delete-btn" data-id=${item.id}>
      <i class="far fa-trash-alt"></i>
    </button>
    <span class="cart-item__img">
      <img src="${item.urlImage}" alt="${item.name}" />
    </span>
    <h3 class="cart-item__title">
      <a href="#" class="cart-item__link">
        ${item.name}
      </a>
    </h3>
    <span class="qty-selector">
      <button class="qty-selector__btn qty-selector__btn--dec" data-action="decreaseQty" data-id=${item.id}>
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
        value="${item.qty}"
      />
      <button class="qty-selector__btn qty-selector__btn--inc" data-action="increaseQty" data-id=${item.id}>
        +
      </button>
    </span>
    <span class="cart-item__total">$${item.totalPrice}</span>
  </li>
`
    )
    .join('')
}

function messageContainer() {
  return document.querySelector('.cart__messages')
}



export default {
  setUIhandlers,
  updateCartUI,
  getInputQty,
  addHandler,
  increaseQty,
  decreaseQty,
  messageContainer,
  closeCart,
  renderMessage,
  renderLoaderSpinner,
  removeLoaderSpinner,
}
