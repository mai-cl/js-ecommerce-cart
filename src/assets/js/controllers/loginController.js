import model from '../model'
import Router from '../router/Router'
import { MESSAGE, TYPE_MESSAGE } from '../utils/messages'
import headerView from '../views/fixed/headerView'
import mainView from '../views/fixed/mainView'
import loginPage from '../views/pages/login'

async function onLogoutUser(e) {
  if (!e.target.matches('#logout-btn')) return
  mainView.renderBlockingLoaderSpinner()
  try {
    await model.logoutUser()
    Router.updateHistoryStack(`/`)
    Router.dispatchNavEvent()
    /* headerView.setLoggedOutUserOptions() */
  } catch (error) {
    console.error(error)
  } finally {
    mainView.removeLoaderSpinner()
  }
}

async function onLoginUser(e) {
  if (!e.target.matches('#login-form')) return
  e.preventDefault()
  mainView.renderBlockingLoaderSpinner()

  const { email, password } = loginPage.getFormData()

  try {
    await model.loginWithEmailAndPassword(email, password)
    mainView.removeLoaderSpinner()

    Router.updateHistoryStack(`/`)
    Router.dispatchNavEvent()
    mainView.renderMessage(TYPE_MESSAGE.SUCCESS, MESSAGE.SUCCESS_LOGIN)
    /* headerView.setLoggedUserOptions()
    headerView.addHandler('click', onLogoutUser) */
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
