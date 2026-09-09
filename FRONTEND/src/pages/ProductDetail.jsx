import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import Navbar from '../components/Navbar'
import { getProductById } from '../api/products'
import { useAuth } from '../context/AuthContext'
import { addToCart } from '../api/cart'

function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [message, setMessage] = useState('')
  const { token } = useAuth()

  useEffect(() => {
    getProductById(id)
      .then(setProduct)
      .catch((err) => console.error(err))
  }, [id])

  async function handleAddToCart() {
    try {
      await addToCart(product._id, 1, token)
      setMessage('Added to cart!')
    } catch (err) {
      setMessage('Failed to add to cart')
    }
  }

  if (!product) return <div className="p-6">Loading...</div>

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />
      <div className="p-6 max-w-2xl mx-auto">
        <div className="h-64 bg-gray-100 rounded-md mb-6 flex items-center justify-center text-gray-400">
          {product.images && product.images.length > 0 ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="h-64 w-full object-contain rounded-md mb-6"
            />
          ) : (
            <div className="h-64 bg-gray-100 rounded-md mb-6 flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
        </div>
        <h1 className="text-2xl font-semibold">{product.name}</h1>
        <p className="text-gray-500 mt-1">{product.brand}</p>
        <p className="text-xl font-semibold mt-4">Rs {product.price}</p>
        <p className="mt-4 text-gray-700">{product.description}</p>

        <button
          onClick={handleAddToCart}
          className="mt-6 bg-black text-white px-6 py-2 rounded-md text-sm hover:bg-gray-800 transition-colors"
        >
          Add to Cart
        </button>
        {message && <p className="mt-2 text-sm text-gray-600">{message}</p>}
      </div>
    </div>
  )
}

export default ProductDetail