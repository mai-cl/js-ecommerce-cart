const cart = document.querySelector('.cart')
const cartModal = document.querySelector('.cart__modal')
const cartList = document.querySelector('.cart__list')
const openCartBtn = document.getElementById('open-cart-btn')
const closeCartBtn = document.getElementById('close-cart-btn')
const cartSubtotalValue = document.querySelector('.cart__subtotal-value')

function setUIhandlers() {
  openCartBtn.addEventListener('click', () => {
    cart.classList.add('show')
  })

  closeCartBtn.addEventListener('click', () => {
    cart.classList.remove('show')
  })
}

function addHandler(event, handler) {
  cart.addEventListener(event, handler)
}

function updateCartUI(data) {
  const { items, subtotal, quantity } = data
  cartList.innerHTML = ''
  cartList.insertAdjacentHTML('beforeend', generateMarkupItem(items))
  cartSubtotalValue.textContent = `$${subtotal}`
}

function getInputQty(itemId) {
  return parseInt(
    document.querySelector(
      `.cart-item[data-id="${itemId}"] .qty-selector__input`
    ).value
  )
}

function increaseQty(itemId) {
  console.log('// Increase quantity')
  cart.querySelector(`.cart-item[data-id="${itemId}"] .qty-selector__input`)
    .value++
}

function decreaseQty(itemId) {
  console.log('// Decrease quantity')
  const input = cart.querySelector(
    `.cart-item[data-id="${itemId}"] .qty-selector__input`
  )
  if (parseInt(input.value) === 1) return
  input.value--
}

function generateMarkupItem(data) {
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

setUIhandlers()

export default {
  updateCartUI,
  getInputQty,
  addHandler,
  increaseQty,
  decreaseQty,
}