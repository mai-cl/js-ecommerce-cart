export async function getJSON(url) {
  try {
    const response = await fetch(url)
    const data = await response.json()
    return data
  } catch (error) {
    throw new Error('Ha ocurrido un error inesperado, intentelo nuevamente')
  }
}
