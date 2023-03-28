const iconClass = {
  success: 'far fa-check-circle',
  info: 'fa-solid fa-circle-info',
  error: 'fa-solid fa-triangle-exclamation',
}

export function Message(type, text) {
  return `
    <div class="message message--${type}">
      <i class="${iconClass[type]}"></i>
      ${text}
    </div>
  `
}
