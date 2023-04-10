import model from '../model'
import { MESSAGE, TYPE_MESSAGE } from '../utils/messages'
import mainView from '../views/fixed/mainView'
import accountPage from '../views/pages/account'

export const account = async () => {
  mainView.removeMessage()

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
