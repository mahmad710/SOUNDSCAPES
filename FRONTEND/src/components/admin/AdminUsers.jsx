import { useEffect, useState } from 'react'
import { getAllUsers, updateUserRole } from '../../api/users'
import { useAuth } from '../../context/AuthContext'

function AdminUsers() {
  const { token, user: currentUser } = useAuth()
  const [users, setUsers] = useState([])

  useEffect(() => {
    loadUsers()
  }, [])

  function loadUsers() {
    getAllUsers(token).then(setUsers).catch((err) => console.error(err))
  }

  async function handleRoleToggle(userId, currentRole) {
    const newRole = currentRole === 'admin' ? 'customer' : 'admin'
    await updateUserRole(userId, newRole, token)
    loadUsers()
  }

  return (
    <div className="flex flex-col gap-2">
      {users.map((user) => (
        <div
          key={user._id}
          className="flex items-center justify-between bg-white/60 backdrop-blur-xl border border-white/40 rounded-xl px-4 py-3"
        >
          <div>
            <p className="font-medium text-sm">{user.name}</p>
            <p className="text-xs text-gray-400">{user.email}</p>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={`text-xs px-3 py-1 rounded-full ${
                user.role === 'admin' ? 'bg-black text-white' : 'bg-gray-100 text-gray-500'
              }`}
            >
              {user.role}
            </span>

            {user._id !== currentUser?._id && (
              <button
                onClick={() => handleRoleToggle(user._id, user.role)}
                className="text-sm text-gray-500 hover:text-black transition-colors"
              >
                {user.role === 'admin' ? 'Revoke admin' : 'Make admin'}
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default AdminUsers