export const MESSAGE = {
  ERROR_DEFAULT: 'Ha ocurrido un error inesperado. Inténtelo nuevamente.',
  SUCCESS_ADD_TO_CART: 'Producto agregado al carrito!',
  SUCCESS_REGISTER: 'La cuenta ha sido creada exitosamente!',
  SUCCESS_LOGIN: 'Se ha iniciado la sesión correctamente.',
  SUCCESS_BUY: (orderId) => `La compra Id: ${orderId} se realizó exitosamente.`,
  ERROR_STOCK: 'No hay stock suficiente!',
  ERROR_CART_STOCK: 'Producto sin stock!',
  ERROR_DIFF_PASS_REGISTER: 'Las contraseñas ingresadas no coinciden.',
  ERROR_DIFF_EMAIL_BUY: 'Las direcciones de correo no coinciden.',
  ERROR_EMPTY_CART_BUY: 'El carrito está vacio.'
}

export const TYPE_MESSAGE = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
}
