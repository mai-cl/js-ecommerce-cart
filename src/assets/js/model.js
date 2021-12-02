import { API_URL } from './config'
import { getJSON } from './helpers'

const state = {
  targetProduct: null,
  products: null,
  categorias: null,
  categoria: null,
}

async function getProducts() {
  const data = await getJSON(`${API_URL}/productos?_expand=categoria`)
  state.products = data
}

async function getProductsByCategory(categoriaId) {
  const data = await getJSON(
    `${API_URL}/productos?categoriaId=${categoriaId}&_expand=categoria`
  )
  state.products = data
}

async function getCategories() {
  const data = await getJSON(`${API_URL}/categorias`)
  state.categorias = data
}

async function getCategoryByPathname(pathname) {
  const data = await getJSON(`${API_URL}/categorias?pathname=${pathname}`)
  state.categoria = data
}

async function getProductByPathparam(pathParam) {
  const data = await getJSON(
    `${API_URL}/productos?pathParam=${pathParam}&_expand=categoria`
  )
  state.targetProduct = data[0]
  console.log(state.targetProduct)
}

export default {
  state,
  getCategories,
  getCategoryByPathname,
  getProductByPathparam,
  getProducts,
  getProductsByCategory,
}
