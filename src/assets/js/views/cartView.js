const cart = document.querySelector('.cart')
const openCartBtn = document.getElementById('open-cart-btn')
const closeCartBtn = document.getElementById('close-cart-btn')

function setUIhandlers() {
  openCartBtn.addEventListener('click', () => {
    cart.classList.add('show')
  })

  closeCartBtn.addEventListener('click', () => {
    cart.classList.remove('show')
  })
}

setUIhandlers()
