function InputText({ label, name, type, isRequired }, classNames = []) {
  return `
    <div class='form-control ${classNames.join(' ')}'>
      <label class='form-control__label' for='${name}'>${label}</label>
      <input id=${name} name=${name} type=${type} class='form-control__input' ${
    isRequired && 'required'
  }/>
    </div>
  `
}

export default InputText
