import model from '../model'
import Router from '../router/Router'
import { MESSAGE, TYPE_MESSAGE } from '../utils/messages'
import { getQueryParam } from '../utils/queryParams'
import mainView from '../views/fixed/mainView'
import loginPage from '../views/pages/login'

async function onLoginUser(e) {
  if (!e.target.matches('#login-form')) return
  e.preventDefault()
  mainView.renderBlockingLoaderSpinner()

  const { email, password } = loginPage.getFormData()

  try {
    await model.loginWithEmailAndPassword(email, password)
    mainView.removeLoaderSpinner()

    const redirect = getQueryParam('redirect')

    if (redirect) {
      Router.updateHistoryStack(redirect)
      Router.dispatchNavEvent()
      mainView.renderMessage(TYPE_MESSAGE.SUCCESS, MESSAGE.SUCCESS_LOGIN)
      return
    }

    Router.updateHistoryStack(`/`)
    Router.dispatchNavEvent()
    mainView.renderMessage(TYPE_MESSAGE.SUCCESS, MESSAGE.SUCCESS_LOGIN)
  } catch (error) {
    mainView.removeLoaderSpinner()
    mainView.renderMessage(TYPE_MESSAGE.ERROR, error.message, true)
  }
}

export const login = () => {
  model.abortIncomingRequest()
  mainView.clear()
  mainView.removeMessage()
  loginPage.show()
  loginPage.addHandler('submit', onLoginUser)
}
