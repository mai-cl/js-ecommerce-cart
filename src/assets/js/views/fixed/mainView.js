import LoaderSpinner from '../components/LoaderSpinner'
import messagesManager from '../utils/messagesManager'

const mainMessageContainer = document.querySelector('.messages')
const main = document.querySelector('main')
const body = document.querySelector('body')

function addHandler(event, handler) {
  document.getElementById('main').addEventListener(event, handler)
}

function removeMessage() {
  messagesManager.removeMessageOn(mainMessageContainer)
}

function renderMessage(type, text, isFixed) {
  messagesManager.renderMessageOn(mainMessageContainer, type, text, isFixed)
}

function renderLoaderSpinner() {
  main.innerHTML = `${LoaderSpinner()}`
}

function renderBlockingLoaderSpinner() {
  body.insertAdjacentHTML('beforeend', `${LoaderSpinner(true)}`)
}

function removeLoaderSpinner() {
  body.querySelector('.loader-spinner').remove()
}

function clear() {
  main.innerHTML = ''
}

export default {
  addHandler,
  removeMessage,
  renderMessage,
  renderLoaderSpinner,
  removeLoaderSpinner,
  renderBlockingLoaderSpinner,
  clear,
}
