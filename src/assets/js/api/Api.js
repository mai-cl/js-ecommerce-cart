export async function getProducts() {
  const response = await fetch(
    'https://api-ecommerce-hw.herokuapp.com/productos?_expand=categoria'
  )
  return await response.json()
}

export async function getProductsByCategory(categoriaId) {
  const response = await fetch(
    `https://api-ecommerce-hw.herokuapp.com/productos?categoriaId=${categoriaId}&_expand=categoria`
  )
  return await response.json()
}

export async function getCategories() {
  const response = await fetch(
    `https://api-ecommerce-hw.herokuapp.com/categorias`
  )
  return await response.json()
}

export async function getCategoryByPathname(pathname) {
  const response = await fetch(
    `https://api-ecommerce-hw.herokuapp.com/categorias?pathname=${pathname}`
  )
  return await response.json()
}

export async function getProductByPathparam(pathParam) {
  const response = await fetch(
    `https://api-ecommerce-hw.herokuapp.com/productos?pathParam=${pathParam}&_expand=categoria`
  )
  return await response.json()
}
