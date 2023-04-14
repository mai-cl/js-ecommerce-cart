import { auth } from '../../../firebase/firebaseConfig'
import model from '../model'
import Router from '../router/Router'
import { MESSAGE, TYPE_MESSAGE } from '../utils/messages'
import mainView from '../views/fixed/mainView'
import accountPage from '../views/pages/account'

export const account = async () => {
  model.abortIncomingRequest()
  mainView.removeMessage()
  mainView.clear()

  if (!auth.currentUser) {
    // redirect to login
    Router.replaceHistoryState('/login?redirect=/account')
    Router.dispatchNavEvent()
    return
  }

  mainView.renderLoaderSpinner()

  try {
    await model.getUserOrders()
    const { user, orders } = model.state
    accountPage.show({ user, orders })

    mainView.removeLoaderSpinner()
  } catch (error) {
    if (error.name !== 'AbortError') {
      mainView.renderMessage(TYPE_MESSAGE.ERROR, MESSAGE.ERROR_DEFAULT, true)
      mainView.removeLoaderSpinner()
    }
  }
}
