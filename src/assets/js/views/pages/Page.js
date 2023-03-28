class Page {
  _parentElement = document.getElementById('main')

  addHandler(event, handler) {
    document.getElementById(this._idSelector).addEventListener(event, handler)
  }

  show(props) {
    this._data = props
    this._parentElement.insertAdjacentHTML('beforeend', this._generateMarkup())
  }
}

export default Page
