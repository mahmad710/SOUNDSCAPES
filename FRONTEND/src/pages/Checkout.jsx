import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useAuth } from '../context/AuthContext'
import { createOrder } from '../api/orders'
import { getCart } from '../api/cart'

const STEPS = ['Cart', 'Shipping', 'Payment']

function Checkout() {
  const { token } = useAuth()

  const [cart, setCart] = useState(null)
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')
  const [zip, setZip] = useState('')
  const [country, setCountry] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (token) {
      getCart(token).then(setCart).catch((err) => console.error(err))
    }
  }, [token])

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const shippingAddress = { street, city, zip, country }
      const data = await createOrder(shippingAddress, token)
      window.location.href = data.checkoutUrl
    } catch (err) {
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  if (!token) {
    return (
      <div className="min-h-screen bg-white text-black">
        <Navbar />
        <p className="p-6 text-center">Please log in to checkout.</p>
      </div>
    )
  }

  const total = cart
    ? cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
    : 0

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />

      {/* Step indicator */}
      <div className="max-w-4xl mx-auto pt-10 px-6">
        <div className="flex items-center justify-center gap-4 mb-10">
          {STEPS.map((step, i) => {
            const isCurrent = step === 'Shipping'
            const isDone = i === 0
            return (
              <div key={step} className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium
                      ${isDone || isCurrent ? 'bg-black text-white' : 'bg-gray-100 text-gray-400 border border-gray-300'}`}
                  >
                    {i + 1}
                  </div>
                  <span className={`text-sm ${isCurrent ? 'text-black font-medium' : isDone ? 'text-black' : 'text-gray-400'}`}>
                    {step}
                  </span>
                </div>
                {i < STEPS.length - 1 && <div className="w-10 h-px bg-gray-300" />}
              </div>
            )
          })}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 pb-16 grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Shipping form */}
        <div className="md:col-span-3">
          <div className="border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h1 className="text-xl font-semibold mb-6">Shipping Address</h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Street</label>
                <input
                  type="text"
                  placeholder="123 Main St"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">City</label>
                  <input
                    type="text"
                    placeholder="Lahore"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Zip Code</label>
                  <input
                    type="text"
                    placeholder="54000"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Country</label>
                <input
                  type="text"
                  placeholder="Pakistan"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="mt-2 bg-black text-white rounded-lg py-3 text-sm font-medium hover:bg-gray-800 transition disabled:opacity-50"
              >
                {loading ? 'Redirecting...' : 'Continue to Payment'}
              </button>
            </form>
          </div>
        </div>

        {/* Order summary */}
        <div className="md:col-span-2">
          <div className="border border-gray-200 rounded-2xl p-6 shadow-sm sticky top-6">
            <h2 className="text-base font-semibold mb-4">Order Summary</h2>

            {!cart ? (
              <p className="text-sm text-gray-400">Loading...</p>
            ) : cart.items.length === 0 ? (
              <p className="text-sm text-gray-400">Your cart is empty.</p>
            ) : (
              <>
                <div className="flex flex-col gap-3 mb-4 max-h-64 overflow-y-auto pr-1">
                  {cart.items.map((item) => (
                    <div key={item._id} className="flex justify-between text-sm">
                      <span className="text-gray-700">
                        {item.product.name}{' '}
                        <span className="text-gray-400">× {item.quantity}</span>
                      </span>
                      <span className="font-medium">
                        Rs {(item.product.price * item.quantity).toFixed(0)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                  <span className="text-sm text-gray-500">Total</span>
                  <span className="text-lg font-semibold">Rs {total.toFixed(0)}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout