import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

// must match the category enum in your backend Product model
const CATEGORIES = [
  'Guitars',
  'Keyboards',
  'Drums',
  'Strings',
  'Wind',
  'Amps & Pedals',
  'Accessories',
]

function CategoryMenu() {
  const [open, setOpen] = useState(false) // is the dropdown showing?
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const currentSort = searchParams.get('sort') || ''

  function goToCategory(category) {
    const params = new URLSearchParams()
    if (category) params.set('category', category)
    if (currentSort) params.set('sort', currentSort) // keep the sort choice when switching category
    navigate(`/products?${params.toString()}`)
    setOpen(false) // close the menu after picking
  }

  return (
    <div className="fixed top-24 left-4 z-50">
      {/* the floating burger button */}
      <button
        onClick={() => setOpen(!open)}
        className="bg-black text-white w-12 h-12 rounded-full shadow-lg flex flex-col items-center justify-center gap-1 hover:bg-gray-800 transition-colors"
        aria-label="Browse categories"
      >
        <span className="block w-5 h-0.5 bg-white"></span>
        <span className="block w-5 h-0.5 bg-white"></span>
        <span className="block w-5 h-0.5 bg-white"></span>
      </button>

      {/* the dropdown — only rendered when open is true */}
      {open && (
        <div className="mt-2 bg-white border border-gray-200 rounded-lg shadow-lg w-52 py-2">
          <button
            onClick={() => goToCategory('')}
            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 font-medium"
          >
            All Categories
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => goToCategory(cat)}
              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            >
              {cat}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default CategoryMenu