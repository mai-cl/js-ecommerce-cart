import { API_URL } from './config'
import { abortRequest, getJSON } from './api'
import { auth } from '../../firebase/firebaseConfig'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
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
  user: {},
  orders: [],
}

window.state = state

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

function clearCart() {
  ;(state.cart = {
    items: [],
    subtotal: null,
    quantity: null,
  }),
    saveInLocalSt()
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

async function loginWithEmailAndPassword(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    )
    state.user = {
      userId: userCredential.user.uid,
      displayName: userCredential.user.displayName,
      email: userCredential.user.email,
    }
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
    await updateProfile(auth.currentUser, { displayName: name })
    state.user = {
      userId: userCredential.user.uid,
      displayName: auth.currentUser.displayName,
      email: userCredential.user.email,
    }
  } catch (error) {
    throw error
  }
}

async function getUserOrders() {
  try {
    const orders = await getJSON(
      `${API_URL}/compras?userId=${state.user.userId}&_sort=date&_order=desc`
    )
    state.orders = orders
  } catch (error) {
    throw error
  }
}

function getCart() {
  return JSON.parse(localStorage.getItem('cart'))
}

async function confirmBuy({ userId, name, email, phone }) {
  const cart = JSON.parse(localStorage.getItem('cart')) //{items, subtotal, quantity}
  const date = new Date()

  try {
    const response = await fetch(`${API_URL}/compras`, {
      headers: new Headers({ 'content-type': 'application/json' }),
      method: 'POST',
      body: JSON.stringify({
        userId: userId,
        name: name,
        email: email,
        phone: phone,
        date: date,
        totalCost: cart.subtotal,
        items: cart.items,
      }),
    })
    const data = await response.json()
    return data.id
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

  registerUser,
  loginWithEmailAndPassword,
  logoutUser,
  getUserOrders,
  getCart,
  confirmBuy,
  clearCart,
}
