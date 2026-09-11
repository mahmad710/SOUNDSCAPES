const BASE_URL = import.meta.env.VITE_API_URL + '/api'

// getProducts now takes an optional filters object: { category, sort }
export async function getProducts({ category, sort } = {}) {
  const params = new URLSearchParams()
  if (category) params.set('category', category)
  if (sort) params.set('sort', sort)

  const query = params.toString()
  const url = query ? `${BASE_URL}/products?${query}` : `${BASE_URL}/products`

  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to fetch products')
  return res.json()
}

export async function getProductById(id) {
  const res = await fetch(`${BASE_URL}/products/${id}`)
  if (!res.ok) throw new Error('Failed to fetch product')
  return res.json()
}

export async function createProduct(productData, token) {
  const res = await fetch(`${BASE_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(productData),
  })
  if (!res.ok) throw new Error('Failed to create product')
  return res.json()
}

export async function updateProduct(id, productData, token) {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(productData),
  })
  if (!res.ok) throw new Error('Failed to update product')
  return res.json()
}

export async function deleteProduct(id, token) {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error('Failed to delete product')
  return res.json()
}