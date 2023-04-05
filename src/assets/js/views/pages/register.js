import InputText from '../components/InputText'
import Page from './Page'

class Register extends Page {
  _idSelector = 'section-register'
  _title = 'Crear cuenta'
  _inputs = [
    { label: 'Nombre', name: 'name', type: 'text', isRequired: true },
    { label: 'Email', name: 'email', type: 'email', isRequired: true },
    {
      label: 'Contraseña',
      name: 'password',
      type: 'password',
      isRequired: true,
    },
    {
      label: 'Confirmar contraseña',
      name: 'confirmarPassword',
      type: 'password',
      isRequired: true,
    },
  ]

  getFormData() {
    const { email, password, confirmarPassword, name } =
      document.getElementById('register-form')
    return {
      email: email.value,
      password: password.value,
      confirmPassword: confirmarPassword.value,
      name: name.value,
    }
  }

  _generateMarkup() {
    return ` <section class="section-auth" id=${this._idSelector}>
                <div class="container section-auth__container">
                  <h2 class="heading-2 text-center mb-sm">${this._title}</h2>
                  <form class="section-auth__form" id="register-form">
                    ${this._inputs.map(input => InputText(input)).join('')}
                    <button class='btn btn--full-width section-auth__submit-btn mt-sm' type='submit' id='create-account-btn'>Crear cuenta</button>
                  </form>
                </div>
              </section>
    `
  }
}

export default new Register()
