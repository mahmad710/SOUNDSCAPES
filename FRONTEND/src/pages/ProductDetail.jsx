import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ShoppingCart, Check } from 'lucide-react'

import Navbar from '../components/Navbar'
import { getProductById } from '../api/products'
import { useAuth } from '../context/AuthContext'
import { addToCart } from '../api/cart'

function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [message, setMessage] = useState('')
  const { token } = useAuth()

  useEffect(() => {
    getProductById(id)
      .then(setProduct)
      .catch((err) => console.error(err))
  }, [id])

  async function handleAddToCart() {
    try {
      await addToCart(product._id, quantity, token)
      setMessage('Added to cart')
      setTimeout(() => setMessage(''), 2000)
    } catch (err) {
      setMessage('Failed to add to cart')
    }
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white text-black">
        <Navbar />
        <p className="pt-24 text-center text-gray-400">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />

      <div className="max-w-5xl mx-auto pt-24 px-6 pb-16">
        <Link
          to="/products"
          className="text-sm text-gray-400 hover:text-black transition-colors"
        >
          ← Back to Menu
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-6">
          <div className="bg-white/60 backdrop-blur-xl backdrop-saturate-150 border border-white/40 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-8 flex items-center justify-center">
            {product.images && product.images.length > 0 ? (
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-80 object-contain"
              />
            ) : (
              <div className="w-full h-80 flex items-center justify-center text-gray-400 text-sm">
                No Image
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-sm text-gray-400 mb-2">{product.brand}</p>
            <h1 className="font-['Fraunces'] text-3xl md:text-4xl mb-4">
              {product.name}
            </h1>
            <p className="text-2xl font-semibold mb-6">Rs {product.price}</p>

            <p className="text-gray-600 leading-relaxed mb-8">
              {product.description}
            </p>

            {product.specs && Object.keys(product.specs).length > 0 && (
              <div className="mb-8">
                <h2 className="text-xs font-semibold uppercase text-gray-400 tracking-wide mb-3">
                  Specs
                </h2>
                <div className="grid grid-cols-2 gap-y-2 text-sm">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="text-gray-500">
                      <span className="capitalize">{key}</span>:{' '}
                      <span className="text-black">{String(value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-gray-200 rounded-full overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-4 py-2 text-gray-500 hover:text-black transition-colors"
                >
                  −
                </button>
                <span className="px-3 text-sm">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-4 py-2 text-gray-500 hover:text-black transition-colors"
                >
                  +
                </button>
              </div>

              <span className="text-sm text-gray-400">
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </span>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex items-center justify-center gap-2 bg-black text-white rounded-full py-3 hover:bg-gray-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ShoppingCart size={18} />
              Add to Cart
            </button>

            {message && (
              <div className="flex items-center gap-2 mt-4 text-sm text-green-600">
                <Check size={16} />
                {message}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail