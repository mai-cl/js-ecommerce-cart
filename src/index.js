import normalize from 'normalize.css'
import style from './assets/scss/main.scss'

import {
  initRouter,
  loadCartData,
  setInitialHandlers,
} from './assets/js/controllers'

initRouter()
loadCartData()
setInitialHandlers()
