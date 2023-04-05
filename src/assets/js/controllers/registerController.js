import model from '../model'
import Router from '../router/Router'
import { MESSAGE, TYPE_MESSAGE } from '../utils/messages'
import headerView from '../views/fixed/headerView'

import mainView from '../views/fixed/mainView'
import registerPage from '../views/pages/register'

async function onLogoutUser(e) {
  if (!e.target.matches('#logout-btn')) return
  mainView.renderBlockingLoaderSpinner()
  try {
    await model.logoutUser()
    Router.updateHistoryStack(`/`)
    Router.dispatchNavEvent()
    headerView.setLoggedOutUserOptions()
  } catch (error) {
    console.error(error)
  } finally {
    mainView.removeLoaderSpinner()
  }
}

async function onRegisterUser(e) {
  if (!e.target.matches('#register-form')) return
  e.preventDefault()
  mainView.renderBlockingLoaderSpinner()

  const { email, password, confirmPassword, name } = registerPage.getFormData()

  try {
    if (password !== confirmPassword)
      throw new Error(MESSAGE.ERROR_DIFF_PASS_REGISTER)
    await model.registerUser(email, password, name)
    mainView.removeLoaderSpinner()
    Router.updateHistoryStack(`/`)
    Router.dispatchNavEvent()
    mainView.renderMessage(TYPE_MESSAGE.SUCCESS, MESSAGE.SUCCESS_REGISTER)
    /* headerView.setLoggedUserOptions()
    headerView.addHandler('click', onLogoutUser) */
  } catch (error) {
    mainView.removeLoaderSpinner()
    console.error(error)
    mainView.renderMessage(TYPE_MESSAGE.ERROR, error.message, true)
  }
}

export const register = () => {
  model.abortIncomingRequest()
  mainView.clear()
  mainView.removeMessage()
  registerPage.show()
  registerPage.addHandler('submit', onRegisterUser)
}
