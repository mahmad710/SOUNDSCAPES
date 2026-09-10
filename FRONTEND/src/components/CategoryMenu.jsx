import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { SlidersHorizontal } from 'lucide-react'

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
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const currentCategory = searchParams.get('category') || ''
  const currentSort = searchParams.get('sort') || ''

  function goToCategory(category) {
    const params = new URLSearchParams()
    if (category) params.set('category', category)
    if (currentSort) params.set('sort', currentSort)
    navigate(`/products?${params.toString()}`)
    setOpen(false)
  }

  return (
    <div className="fixed top-28 left-4 z-30">
      <button
        onClick={() => setOpen(!open)}
        className="bg-white/60 backdrop-blur-xl backdrop-saturate-150 border border-white/40 shadow-[0_4px_20px_rgba(0,0,0,0.08)] w-12 h-12 rounded-full flex items-center justify-center text-gray-600 hover:text-black transition-colors"
        aria-label="Browse categories"
      >
        <SlidersHorizontal size={18} />
      </button>

      {open && (
        <div className="mt-3 bg-white/60 backdrop-blur-xl backdrop-saturate-150 border border-white/40 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.1)] w-56 p-2 flex flex-col gap-1">
          <button
            onClick={() => goToCategory('')}
            className={`text-left px-4 py-2 rounded-full text-sm transition-colors ${
              currentCategory === ''
                ? 'bg-black text-white'
                : 'text-gray-500 hover:bg-black/5 hover:text-black'
            }`}
          >
            All Categories
          </button>

          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => goToCategory(cat)}
              className={`text-left px-4 py-2 rounded-full text-sm transition-colors ${
                currentCategory === cat
                  ? 'bg-black text-white'
                  : 'text-gray-500 hover:bg-black/5 hover:text-black'
              }`}
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