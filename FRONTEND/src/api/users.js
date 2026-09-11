const BASE_URL = import.meta.env.VITE_API_URL + '/api'

export async function getAllUsers(token) {
  const res = await fetch(`${BASE_URL}/users`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error('Failed to fetch users')
  return res.json()
}

export async function updateUserRole(userId, role, token) {
  const res = await fetch(`${BASE_URL}/users/${userId}/role`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ role }),
  })
  if (!res.ok) throw new Error('Failed to update role')
  return res.json()
}