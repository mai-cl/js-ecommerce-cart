let abortController = null

export function abortRequest() {
  if (!abortController) return
  abortController.abort()
}

export async function getJSON(url) {
  try {
    abortController = new AbortController()

    const response = await fetch(url, {
      signal: abortController.signal,
      method: 'GET',
    })
    const data = await response.json()
    return data
  } catch (error) {
    throw error
  }
}
