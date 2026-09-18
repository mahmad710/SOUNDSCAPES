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
    <div className="min-h-screen bg-white text-black font-[Helvetica]">
      <Navbar />
      <CategoryMenu />

      <div className="pt-24 px-6 pb-6">
        <div className="grid grid-cols-3 items-center mb-10">
          <div />

          <h1 className="text-lg font-semibold text-center uppercase tracking-widest">
            {category ? category : 'All Products'}
          </h1>

          <div className="relative justify-self-end">
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="flex items-center gap-2 border border-black px-4 py-2 text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
            >
              <ArrowUpDown size={14} />
              {currentSortLabel}
            </button>

            {sortOpen && (
              <div className="absolute right-0 mt-2 bg-white border border-black w-52 p-1 flex flex-col z-20">
                {SORT_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleSortChange(option.value)}
                    className={`text-left px-4 py-2 text-xs uppercase tracking-widest transition-colors ${sort === option.value
                        ? 'bg-black text-white'
                        : 'text-gray-500 hover:bg-gray-100 hover:text-black'
                      }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-6 gap-y-12">
          {products.map((product) => (
            <Link key={product._id} to={`/product/${product._id}`} className="group">
              <div className="border border-gray-200 p-4 h-[420px] flex flex-col">
                {product.images && product.images.length > 0 ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="h-56 w-full object-contain mb-4 transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="h-56 flex items-center justify-center text-gray-400 text-xs uppercase tracking-widest mb-4">
                    No Image
                  </div>
                )}
                <div className="text-left flex flex-col flex-1">
                  <h2 className="text-sm uppercase tracking-widest font-medium line-clamp-2">
                    {product.name}
                  </h2>
                  <p className="text-xs uppercase tracking-widest text-gray-400 mt-1">
                    {product.brand}
                  </p>
                  <p className="text-sm mt-auto pt-2">Rs {product.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Products