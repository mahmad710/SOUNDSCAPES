const BASE_URL = import.meta.env.VITE_API_URL + '/api'

export async function addToCart(productId, quantity, token) {
  const res = await fetch(`${BASE_URL}/cart/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ productId, quantity }),
  })
  if (!res.ok) throw new Error('Failed to add to cart')
  return res.json()
}

export async function getCart(token) {
  const res = await fetch(`${BASE_URL}/cart`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error('Failed to fetch cart')
  return res.json()
}

export async function updateCartItem(itemId, quantity, token) {
  const res = await fetch(`${BASE_URL}/cart/items/${itemId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ quantity }),
  })
  if (!res.ok) throw new Error('Failed to update item')
  return res.json()
}

export async function removeCartItem(itemId, token) {
  const res = await fetch(`${BASE_URL}/cart/items/${itemId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error('Failed to remove item')
  return res.json()
}