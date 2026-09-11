import { useEffect, useState } from 'react'
import { getAllOrders, updateOrderStatus } from '../../api/orders'
import { useAuth } from '../../context/AuthContext'

const STATUSES = ['pending', 'paid', 'shipped', 'delivered', 'cancelled']

function AdminOrders() {
  const { token } = useAuth()
  const [orders, setOrders] = useState([])

  useEffect(() => {
    loadOrders()
  }, [])

  function loadOrders() {
    getAllOrders(token).then(setOrders).catch((err) => console.error(err))
  }

  async function handleStatusChange(orderId, status) {
    await updateOrderStatus(orderId, status, token)
    loadOrders()
  }

  return (
    <div className="flex flex-col gap-2">
      {orders.length === 0 && (
        <p className="text-gray-400 text-sm">No orders yet.</p>
      )}

      {orders.map((order) => (
        <div
          key={order._id}
          className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-xl px-4 py-3"
        >
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="font-medium text-sm">
                {order.user?.name || 'Unknown user'} — {order.user?.email}
              </p>
              <p className="text-xs text-gray-400">
                Order #{order._id.slice(-6)} · Rs {order.total}
              </p>
            </div>

            <select
              value={order.status}
              onChange={(e) => handleStatusChange(order._id, e.target.value)}
              className="border border-gray-200 rounded-full px-3 py-1.5 text-xs bg-white"
            >
              {STATUSES.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>

          <p className="text-xs text-gray-400">
            Payment: {order.paymentStatus}
          </p>
        </div>
      ))}
    </div>
  )
}

export default AdminOrders