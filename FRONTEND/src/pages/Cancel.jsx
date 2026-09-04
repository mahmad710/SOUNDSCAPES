import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

function Cancel() {
  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />
      <div className="max-w-md mx-auto mt-20 text-center p-6">
        <h1 className="text-2xl font-semibold mb-4">Payment Cancelled</h1>
        <p className="text-gray-500 mb-6">
          No worries — your cart is still saved if you want to try again.
        </p>
        <Link
          to="/cart"
          className="inline-block bg-black text-white rounded-lg px-6 py-2 hover:shadow-md transition"
        >
          Back to Cart
        </Link>
      </div>
    </div>
  )
}

export default Cancel