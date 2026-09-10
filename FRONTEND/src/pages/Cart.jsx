import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Trash2, ShoppingBag } from 'lucide-react'

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
    if (quantity < 1) return
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
        <p className="pt-24 text-center text-gray-400">
          Please log in to see your cart.
        </p>
      </div>
    )
  }

  if (!cart) {
    return (
      <div className="min-h-screen bg-white text-black">
        <Navbar />
        <p className="pt-24 text-center text-gray-400">Loading...</p>
      </div>
    )
  }

  const total = cart.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  )

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />
      <div className="max-w-2xl mx-auto pt-24 px-6 pb-16">
        <h1 className="font-['Fraunces'] text-3xl mb-8">Your Cart</h1>

        {cart.items.length === 0 ? (
          <div className="flex flex-col items-center text-center py-20">
            <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <ShoppingBag size={22} className="text-gray-400" />
            </div>
            <p className="text-gray-400 mb-6">Your cart is empty.</p>
            <Link
              to="/products"
              className="bg-black text-white px-6 py-2.5 rounded-full text-sm hover:bg-gray-800 transition-colors"
            >
              Browse Instruments
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {cart.items.map((item) => (
              <div
                key={item._id}
                className="flex items-center gap-4 bg-white/60 backdrop-blur-xl backdrop-saturate-150 border border-white/40 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-4"
              >
                <div className="w-20 h-20 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  {item.product.images && item.product.images.length > 0 ? (
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-contain p-1"
                    />
                  ) : (
                    <span className="text-gray-300 text-xs">No Image</span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{item.product.name}</p>
                  <p className="text-sm text-gray-400">Rs {item.product.price}</p>
                </div>

                <div className="flex items-center border border-gray-200 rounded-full overflow-hidden">
                  <button
                    onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                    className="px-3 py-1.5 text-gray-500 hover:text-black transition-colors"
                  >
                    −
                  </button>
                  <span className="px-2 text-sm">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                    className="px-3 py-1.5 text-gray-500 hover:text-black transition-colors"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => handleRemove(item._id)}
                  className="text-gray-300 hover:text-red-500 transition-colors flex-shrink-0"
                  aria-label="Remove item"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}

            <div className="flex items-center justify-between mt-6 px-2">
              <span className="text-gray-400">Total</span>
              <span className="text-2xl font-semibold">Rs {total.toFixed(2)}</span>
            </div>

            <Link
              to="/checkout"
              className="text-center bg-black text-white rounded-full py-3 mt-4 hover:bg-gray-800 transition-colors"
            >
              Proceed to Checkout
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart