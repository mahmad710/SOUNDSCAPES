import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { getProducts } from '../api/products'

function Products() {
  const [products, setProducts] = useState([])
  const [searchParams] = useSearchParams()

  // read filters straight from the URL — e.g. /products?category=Guitars&sort=price_asc
  const category = searchParams.get('category') || ''
  const sort = searchParams.get('sort') || ''

  useEffect(() => {
    getProducts({ category, sort })
      .then(setProducts)
      .catch((err) => console.error(err))
  }, [category, sort]) // re-fetch whenever the URL filters change

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
          {products.map((product) => (
            <Link key={product._id} to={`/product/${product._id}`}>
              <div className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                <div className="h-40 bg-gray-100 rounded-md mb-4 flex items-center justify-center text-gray-400 text-sm">
                  No Image
                </div>
                <h2 className="font-medium text-base">{product.name}</h2>
                <p className="text-sm text-gray-500">{product.brand}</p>
                <p className="mt-2 font-semibold">${product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Products