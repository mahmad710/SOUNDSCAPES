import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import Navbar from '../components/Navbar'
import { useAuth } from '../context/AuthContext'
import { getCart, updateCartItem, removeCartItem } from '../api/cart'

function Cart() {
  const { token } = useAuth()
  const [cart, setCart] = useState(null)

  useEffect(() => {
    if (token) {
      getCart(token).then(setCart).catch((err) => console.error(err))
    }
  }, [token])

  async function handleQuantityChange(itemId, quantity) {
    const updated = await updateCartItem(itemId, quantity, token)
    setCart(updated)
  }

  async function handleRemove(itemId) {
    const updated = await removeCartItem(itemId, token)
    setCart(updated)
  }

  if (!token) {
    return (
      <div className="min-h-screen bg-white text-black">
        <Navbar />
        <p className="p-6">Please log in to see your cart.</p>
      </div>
    )
  }

  if (!cart) return <div className="p-6">Loading...</div>

  const total = cart.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  )

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />
      <div className="p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">Your Cart</h1>

        {cart.items.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {cart.items.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between border border-gray-200 rounded-lg p-4"
              >
                <div>
                  <p className="font-medium">{item.product.name}</p>
                  <p className="text-sm text-gray-500">${item.product.price}</p>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item._id, Number(e.target.value))
                    }
                    className="w-16 border border-gray-300 rounded-md px-2 py-1 text-sm"
                  />
                  <button
                    onClick={() => handleRemove(item._id)}
                    className="text-sm text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="text-right font-semibold text-lg mt-4">
              Total: ${total.toFixed(2)}
            </div>

            <div className="text-right mt-2">
              <Link
                to="/checkout"
                className="inline-block bg-black text-white px-6 py-2 rounded-md text-sm hover:bg-gray-800 transition-colors"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart