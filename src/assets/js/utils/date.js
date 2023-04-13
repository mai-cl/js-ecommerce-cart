export function getFormatDate(date) {
    const dateObj = new Date(date)
    return `${dateObj.getDay()}/${dateObj.getMonth()}/${dateObj.getFullYear()}`
}