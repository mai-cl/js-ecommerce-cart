let messagesTimeout = {}

function generateMarkup(msj, type) {
  const iconClass = {
    success: 'far fa-check-circle',
    info: 'fa-solid fa-circle-info',
    error: 'fa-solid fa-triangle-exclamation',
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

function removeMessageFrom(messageBox) {
  messageBox.querySelector('.message').remove()
}

function renderSuccessMessage(msj) {
  document
    .querySelector('.messages')
    .insertAdjacentHTML('beforeend', generateMarkup(msj, 'success'))
  setTimeout(removeMessage, 3000)
}

function renderMessageOn(containerElement, type, msj, isFixed) {
  if (messagesTimeout[containerElement.id])
    clearTimeout(messagesTimeout[containerElement.id])
  containerElement.innerHTML = generateMarkup(msj, type)
  if (!isFixed) {
    messagesTimeout[containerElement.id] = setTimeout(
      () => removeMessageFrom(containerElement),
      3000
    )
  }
}

function removeMessageOn(containerElement) {
  if (messagesTimeout[containerElement.id])
    clearTimeout(messagesTimeout[containerElement.id])
  containerElement.innerHTML = ''
}

export default {
  renderSuccessMessage,
  removeMessageOn,
  renderMessageOn,
}
