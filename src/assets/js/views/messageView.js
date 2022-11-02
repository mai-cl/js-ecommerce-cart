function generateMarkup(msj, type) {
  const iconClass = {
    success: 'far fa-check-circle',
    info: 'info',
  }

  return `
    <div class="message message--${type}">
      <i class="${iconClass[type]}"></i>
      ${msj}
    </div>
  `
}

function removeMessage() {
  document.querySelector('.message').remove()
}

function renderSuccessMessage(msj) {
  document
    .querySelector('.messages')
    .insertAdjacentHTML('beforeend', generateMarkup(msj, 'success'))
  setTimeout(removeMessage, 3000)
}

export default {
  renderSuccessMessage,
}
