function InfoText(type, text, className = '') {
    return `
        <div class="info-text info-text--${type} mb-sm ${className}">
            <span>${text}</span>
        </div>
    `
}

export default InfoText