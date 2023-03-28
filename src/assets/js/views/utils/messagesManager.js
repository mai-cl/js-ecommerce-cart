import { Message } from '../components/Message'

let messagesTimeout = {}

function renderMessageOn(containerElement, type, text, isFixed) {
  if (messagesTimeout[containerElement.id])
    clearTimeout(messagesTimeout[containerElement.id])
  containerElement.innerHTML = `${Message(type, text)}`
  if (!isFixed) {
    messagesTimeout[containerElement.id] = setTimeout(
      () => (containerElement.innerHTML = ''),
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
  removeMessageOn,
  renderMessageOn,
}
