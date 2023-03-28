function LoaderSpinner(isBlocking = false) {
  return `
      <div class="loader-spinner ${
        isBlocking ? 'loader-spinner--pos-absolute' : ''
      }">
        <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
      </div>
    `
}

export default LoaderSpinner
