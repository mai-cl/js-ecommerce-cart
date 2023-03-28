function addHandler(event, handler) {
  document.querySelector('.footer').addEventListener(event, handler)
}

export default {
  addHandler,
}
