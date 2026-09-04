import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

import Navbar from '../components/Navbar'
import CategoryMenu from '../components/CategoryMenu'
import { getProducts } from '../api/products'

function Products() {
  const [products, setProducts] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()

  const category = searchParams.get('category') || ''
  const sort = searchParams.get('sort') || ''

  useEffect(() => {
    getProducts({ category, sort })
      .then(setProducts)
      .catch((err) => console.error(err))
  }, [category, sort])

  // when the sort dropdown changes, keep category as-is, just update sort
  function handleSortChange(e) {
    const newSort = e.target.value
    const params = new URLSearchParams()
    if (category) params.set('category', category)
    if (newSort) params.set('sort', newSort)
    setSearchParams(params)
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />
      <CategoryMenu />

      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-lg font-semibold">
            {category ? category : 'All Products'}
          </h1>

          <select
            value={sort}
            onChange={handleSortChange}
            className="border border-gray-300 rounded-md p-2 text-sm bg-white"
          >
            <option value="">Sort By</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="newest">Newest First</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link key={product._id} to={`/product/${product._id}`}>
              <div className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                <div className="h-40 bg-gray-100 rounded-md mb-4 flex items-center justify-center text-gray-400 text-sm">
                  No Image
                </div>
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