const BASE_URL = import.meta.env.VITE_API_URL + '/api'

export async function getOrderById(orderId, token) {
  const res = await fetch(`${BASE_URL}/orders/${orderId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok) {
    throw new Error('Failed to fetch order')
  }

  return res.json()
}


export async function createOrder(shippingAddress, token) {
  const res = await fetch(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ shippingAddress }),
  })

  if (!res.ok) {
    throw new Error('Failed to create order')
  }

  return res.json()
}

