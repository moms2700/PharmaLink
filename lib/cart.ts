// Gestion du panier côté client avec localStorage

export interface CartItem {
  id: string
  name: string
  dci: string
  price: number
  quantity: number
  imageUrl?: string
}

export const getCart = (): CartItem[] => {
  if (typeof window === 'undefined') return []
  const cart = localStorage.getItem('pharmalink_cart')
  return cart ? JSON.parse(cart) : []
}

export const saveCart = (cart: CartItem[]): void => {
  if (typeof window === 'undefined') return
  localStorage.setItem('pharmalink_cart', JSON.stringify(cart))
}

export const addToCart = (item: Omit<CartItem, 'quantity'>): void => {
  const cart = getCart()
  const existingItem = cart.find((i) => i.id === item.id)

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cart.push({ ...item, quantity: 1 })
  }

  saveCart(cart)

  // Dispatch event pour mettre à jour le compteur
  window.dispatchEvent(new Event('cartUpdated'))
}

export const removeFromCart = (itemId: string): void => {
  const cart = getCart().filter((item) => item.id !== itemId)
  saveCart(cart)
  window.dispatchEvent(new Event('cartUpdated'))
}

export const updateQuantity = (itemId: string, quantity: number): void => {
  const cart = getCart()
  const item = cart.find((i) => i.id === itemId)

  if (item) {
    if (quantity <= 0) {
      removeFromCart(itemId)
    } else {
      item.quantity = quantity
      saveCart(cart)
      window.dispatchEvent(new Event('cartUpdated'))
    }
  }
}

export const clearCart = (): void => {
  saveCart([])
  window.dispatchEvent(new Event('cartUpdated'))
}

export const getCartTotal = (): number => {
  return getCart().reduce((total, item) => total + item.price * item.quantity, 0)
}

export const getCartCount = (): number => {
  return getCart().reduce((count, item) => count + item.quantity, 0)
}
