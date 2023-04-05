import InputText from '../components/InputText'
import Page from './Page'

class Login extends Page {
  _idSelector = 'section-login'
  _title = 'Iniciar sesión'
  _inputs = [
    { label: 'Email', name: 'email', type: 'email', isRequired: true },
    {
      label: 'Contraseña',
      name: 'password',
      type: 'password',
      isRequired: true,
    },
  ]

  getFormData() {
    const form = document.getElementById('login-form')
    const { email, password } = form
    return {
      email: email.value,
      password: password.value,
    }
  }

  _generateMarkup() {
    return ` <section class="section-auth" id=${this._idSelector}>
                <div class="container section-auth__container">
                  <h2 class="heading-2 text-center mb-sm">${this._title}</h2>
                  <form class="section-auth__form" id="login-form">
                    ${this._inputs.map(input => InputText(input)).join('')}
                    <button class='btn btn--full-width section-auth__submit-btn mt-sm'>Iniciar sesión</button>
                  </form>
                </div>
              </section>
    `
  }
}

export default new Login()
