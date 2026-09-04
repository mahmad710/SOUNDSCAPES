import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'

import Navbar from '../components/Navbar'
import { useAuth } from '../context/AuthContext'
import { getOrderById } from '../api/orders'

function Success() {
  const { token } = useAuth()
  const [searchParams] = useSearchParams()
  const orderId = searchParams.get('orderId')

  const [order, setOrder] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!orderId || !token) return

    let attempts = 0

    async function fetchOrder() {
      try {
        const data = await getOrderById(orderId, token)
        setOrder(data)

        // if webhook hasn't updated it yet, try again shortly
        if (data.paymentStatus !== 'paid' && attempts < 5) {
          attempts += 1
          setTimeout(fetchOrder, 2000)
        }
      } catch (err) {
        setError('Could not load order details.')
      }
    }

    fetchOrder()
  }, [orderId, token])

  if (!orderId) {
    return (
      <div className="min-h-screen bg-white text-black">
        <Navbar />
        <p className="p-6 text-center">No order found.</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white text-black">
        <Navbar />
        <p className="p-6 text-center text-red-500">{error}</p>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-white text-black">
        <Navbar />
        <p className="p-6 text-center">Loading your order...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />
      <div className="max-w-xl mx-auto mt-12 p-6 border border-gray-200 rounded-2xl shadow-sm">
        <h1 className="text-2xl font-semibold mb-2 text-center">
          {order.paymentStatus === 'paid' ? 'Payment Successful 🎉' : 'Processing your payment...'}
        </h1>
        <p className="text-gray-500 text-center mb-6">
          Order #{order._id}
        </p>

        <div className="flex flex-col gap-3 mb-6">
          {order.items.map((item) => (
            <div key={item.product} className="flex justify-between text-sm border-b border-gray-100 pb-2">
              <span>{item.name} × {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div className="text-right font-semibold text-lg mb-6">
          Total: ${order.total.toFixed(2)}
        </div>

        <div className="text-sm text-gray-600 mb-6">
          <p className="font-medium text-black mb-1">Shipping Address</p>
          <p>{order.shippingAddress.street}</p>
          <p>{order.shippingAddress.city}, {order.shippingAddress.zip}</p>
          <p>{order.shippingAddress.country}</p>
        </div>

        <div className="text-sm text-gray-600 mb-6">
          <p className="font-medium text-black mb-1">Status</p>
          <p>Order: {order.status}</p>
          <p>Payment: {order.paymentStatus}</p>
        </div>

        <Link
          to="/"
          className="block text-center bg-black text-white rounded-lg py-2 hover:shadow-md transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}

export default Success