import model from '../model'
import mainView from '../views/fixed/mainView'
import cartView from '../views/fixed/cartView'
import checkoutPage from '../views/pages/checkout'
import { MESSAGE, TYPE_MESSAGE } from '../utils/messages'
import Router from '../router/Router'

async function onSubmitOrder(e) {
    e.preventDefault()
    if(!e.target.matches('#checkout-form')) return

    mainView.renderBlockingLoaderSpinner()

    try {
        const {name, phone, email, confirmarEmail} = checkoutPage.getFormData()
        if(email !== confirmarEmail) throw new Error(MESSAGE.ERROR_DIFF_EMAIL_BUY)
        if(!model.getCart().items.length) throw new Error(MESSAGE.ERROR_EMPTY_CART_BUY)
        const orderId = await model.confirmBuy({name, phone, email})
        mainView.removeLoaderSpinner()
        console.log(`compra ${orderId} OK`)
        
        model.clearCart()
        cartView.updateCartUI(model.state.cart)
        
        Router.updateHistoryStack(`/`)
        Router.dispatchNavEvent()
        mainView.renderMessage(TYPE_MESSAGE.SUCCESS, MESSAGE.SUCCESS_BUY(orderId))
        
    } catch (error) {
        console.error(error)
        mainView.removeLoaderSpinner()
        mainView.renderMessage(TYPE_MESSAGE.ERROR, error.message)
    }
}

export const syncWithCartUpdates = () => {
    checkoutPage.updateCheckoutSummary(model.getCart())
}

export const checkout = () => {
    model.abortIncomingRequest()
    mainView.removeMessage()
    mainView.clear()
    checkoutPage.show(model.getCart())
    checkoutPage.addHandler('submit', onSubmitOrder)
}