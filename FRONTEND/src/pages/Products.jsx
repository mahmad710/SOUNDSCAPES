import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowUpDown } from 'lucide-react'
import Navbar from '../components/Navbar'
import CategoryMenu from '../components/CategoryMenu'
import { getProducts } from '../api/products'

const SORT_OPTIONS = [
  { label: 'Default', value: '' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Newest First', value: 'newest' },
]

function Products() {
  const [products, setProducts] = useState([])
  const [sortOpen, setSortOpen] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()

  const category = searchParams.get('category') || ''
  const sort = searchParams.get('sort') || ''

  useEffect(() => {
    getProducts({ category, sort })
      .then(setProducts)
      .catch((err) => console.error(err))
  }, [category, sort])

  function handleSortChange(newSort) {
    const params = new URLSearchParams()
    if (category) params.set('category', category)
    if (newSort) params.set('sort', newSort)
    setSearchParams(params)
    setSortOpen(false)
  }

  const currentSortLabel =
    SORT_OPTIONS.find((option) => option.value === sort)?.label || 'Sort By'

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />
      <CategoryMenu />

      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-lg font-semibold">
            {category ? category : 'All Products'}
          </h1>

          <div className="relative">
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="flex items-center gap-2 bg-white/60 backdrop-blur-xl backdrop-saturate-150 border border-white/40 shadow-[0_4px_20px_rgba(0,0,0,0.05)] rounded-full px-4 py-2 text-sm text-gray-600 hover:text-black transition-colors"
            >
              <ArrowUpDown size={14} />
              {currentSortLabel}
            </button>

            {sortOpen && (
              <div className="absolute right-0 mt-2 bg-white/60 backdrop-blur-xl backdrop-saturate-150 border border-white/40 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.1)] w-48 p-2 flex flex-col gap-1 z-20">
                {SORT_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleSortChange(option.value)}
                    className={`text-left px-4 py-2 rounded-full text-sm transition-colors ${
                      sort === option.value
                        ? 'bg-black text-white'
                        : 'text-gray-500 hover:bg-black/5 hover:text-black'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link key={product._id} to={`/product/${product._id}`}>
              <div className="group bg-white/60 backdrop-blur-xl backdrop-saturate-150 border border-white/40 rounded-2xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.1)]">
                {product.images && product.images.length > 0 ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="h-40 w-full object-contain bg-gray-50 rounded-xl mb-4 p-2 transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="h-40 bg-gray-100 rounded-xl mb-4 flex items-center justify-center text-gray-400 text-sm">
                    No Image
                  </div>
                )}
                <h2 className="font-medium text-base">{product.name}</h2>
                <p className="text-sm text-gray-500">{product.brand}</p>
                <p className="mt-2 font-semibold">Rs {product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Products