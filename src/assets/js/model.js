import { API_URL } from './config'
import { abortRequest, getJSON } from './api'
import {
  auth,
  googleAuthProvider,
  signInWithPopup,
} from '../../firebase/firebaseConfig'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'

const state = {
  targetProduct: null,
  products: null,
  categorias: null,
  categoria: null,
  cart: {
    items: [],
    subtotal: null,
    quantity: null,
  },
}

function abortIncomingRequest() {
  abortRequest()
}

function saveInLocalSt() {
  localStorage.setItem('cart', JSON.stringify(state.cart))
}

function loadLocalSt() {
  const data = localStorage.getItem('cart')
  if (!data) return
  state.cart = JSON.parse(data)
}

function addToCart(qty = 1) {
  const { id, nombre, precio, urlImage } = state.targetProduct
  let itemInCart = state.cart.items.find(item => item.id === id)
  if (itemInCart) {
    itemInCart.qty += qty
    itemInCart.totalPrice = itemInCart.qty * itemInCart.unitPrice
    updateSubtotal()
    saveInLocalSt()
    return itemInCart
  } else {
    const newItem = {
      id: id,
      urlImage: urlImage,
      name: nombre,
      qty: qty,
      unitPrice: precio,
      totalPrice: qty * precio,
    }
    state.cart.items.push(newItem)
    updateSubtotal()
    saveInLocalSt()
    return newItem
  }
}

function updateItemCartQty(qty) {
  const item = state.cart.items.find(item => item.id === state.targetProduct.id)
  item.qty = qty
  item.totalPrice = qty * item.unitPrice
  updateSubtotal()
  saveInLocalSt()
}

function deleteItemCart(itemId) {
  const itemIndex = state.cart.items.findIndex(item => item.id === itemId)
  const [deletedItem] = state.cart.items.splice(itemIndex, 1)
  updateSubtotal()
  saveInLocalSt()
  return deletedItem
}

function updateSubtotal() {
  state.cart.subtotal = state.cart.items.reduce(
    (acum, item) => acum + item.totalPrice,
    0
  )
}

function getItemQtyInCart(productId) {
  const item = state.cart.items.find(item => item.id == productId)
  return item ? item.qty : 0
}

function checkEnoughStock(inputQty, action) {
  if (action === 'decreaseQty') return
  if (state.targetProduct.stock < inputQty + 1)
    throw new Error('No hay stock suficiente!')
}

async function getProducts() {
  const data = await getJSON(`${API_URL}/productos?_expand=categoria`)
  state.products = data
}

async function getProductById(id) {
  const data = await getJSON(`${API_URL}/productos/${id}?_expand=categoria`)
  state.targetProduct = data
}

async function getProductsByCategory(categoriaId) {
  const data = await getJSON(
    `${API_URL}/productos?categoriaId=${categoriaId}&_expand=categoria`
  )
  state.products = data
}

async function getProductsByQuery(query) {
  const data = await getJSON(
    `${API_URL}/productos?q=${query}&_expand=categoria`
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
}

/* async function loginWithGoogle() {
  try {
    const response = await signInWithPopup(auth, googleAuthProvider)
    state.user = {
      userId: response.user.uid,
      displayName: response.user.displayName,
    }
    console.log(response)
  } catch (error) {
    throw error
  }
} */

async function loginWithEmailAndPassword(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    )
    state.user = {
      userId: response.user.uid,
      displayName: response.user.displayName,
    }
    console.log(userCredential)
  } catch (error) {
    throw error
  }
}

async function logoutUser() {
  try {
    await signOut(auth)
    state.user = {}
  } catch (error) {
    throw error
  }
}

async function registerUser(email, password, name) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )
    state.user = {
      userId: response.user.uid,
      displayName: response.user.displayName,
    }
    console.log(userCredential)
  } catch (error) {
    throw error
  }
}

export default {
  state,
  getItemQtyInCart,
  getCategories,
  getCategoryByPathname,
  getProductByPathparam,
  getProducts,
  getProductsByCategory,
  getProductsByQuery,
  getProductById,
  addToCart,
  updateItemCartQty,
  deleteItemCart,
  checkEnoughStock,
  loadLocalSt,
  abortIncomingRequest,
  loginWithGoogle,
  registerUser,
  loginWithEmailAndPassword,
  logoutUser,
}
