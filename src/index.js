import normalize from 'normalize.css'
import style from './assets/scss/main.scss'

import {
  initRouter,
  loadCartData,
  setAppHandlers,
} from './assets/js/controllers/mainController'

initRouter()
loadCartData()
setAppHandlers()
