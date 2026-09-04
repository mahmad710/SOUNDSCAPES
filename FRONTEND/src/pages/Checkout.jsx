import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { createOrder } from '../api/orders'

function Checkout() {
  const { token } = useAuth()
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')
  const [zip, setZip] = useState('')
  const [country, setCountry] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const shippingAddress = { street, city, zip, country }
      const data = await createOrder(shippingAddress, token)

      // redirect the browser to Safepay's hosted checkout page
      window.location.href = data.checkoutUrl
    } catch (err) {
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  if (!token) {
    return <p>Please log in to checkout.</p>
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border border-gray-200 rounded-2xl shadow-sm">
      <h1 className="text-2xl font-semibold mb-6">Shipping Address</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Street"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          required
          className="border border-gray-300 rounded-lg p-2"
        />
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
          className="border border-gray-300 rounded-lg p-2"
        />
        <input
          type="text"
          placeholder="Zip Code"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          required
          className="border border-gray-300 rounded-lg p-2"
        />
        <input
          type="text"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
          className="border border-gray-300 rounded-lg p-2"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white rounded-lg py-2 hover:shadow-md transition"
        >
          {loading ? 'Redirecting...' : 'Proceed to Payment'}
        </button>
      </form>
    </div>
  )
}

export default Checkout