import { useNavigate, useSearchParams } from 'react-router-dom'

const CATEGORIES = [
  'Guitars',
  'Keyboards',
  'Drums',
  'Strings',
  'Wind',
  'Amps & Pedals',
  'Accessories',
]

const SORT_OPTIONS = [
  { label: 'Default', value: '' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Newest First', value: 'newest' },
]

function Sidebar() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const currentCategory = searchParams.get('category') || ''
  const currentSort = searchParams.get('sort') || ''

  function goToProducts(category, sort) {
    const params = new URLSearchParams()
    if (category) params.set('category', category)
    if (sort) params.set('sort', sort)
    navigate(`/products?${params.toString()}`)
  }

  return (
    <aside className="w-64 shrink-0 p-4">
      <div className="sticky top-24 bg-white/60 backdrop-blur-xl backdrop-saturate-150 border border-white/40 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-5">
        <h2 className="text-xs font-semibold uppercase text-gray-400 mb-4 tracking-wide">
          Category
        </h2>

        <div className="flex flex-col gap-1 mb-6">
          <button
            onClick={() => goToProducts('', currentSort)}
            className={`text-left px-3 py-2 rounded-full text-sm transition-colors ${
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
              onClick={() => goToProducts(cat, currentSort)}
              className={`text-left px-3 py-2 rounded-full text-sm transition-colors ${
                currentCategory === cat
                  ? 'bg-black text-white'
                  : 'text-gray-500 hover:bg-black/5 hover:text-black'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <h2 className="text-xs font-semibold uppercase text-gray-400 mb-4 tracking-wide">
          Sort By
        </h2>

        <div className="flex flex-col gap-1">
          {SORT_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => goToProducts(currentCategory, option.value)}
              className={`text-left px-3 py-2 rounded-full text-sm transition-colors ${
                currentSort === option.value
                  ? 'bg-black text-white'
                  : 'text-gray-500 hover:bg-black/5 hover:text-black'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </aside>
  )
}

export default Sidebar