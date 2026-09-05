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

function Sidebar() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  // read whatever is currently in the URL, so the dropdowns stay in sync
  const currentCategory = searchParams.get('category') || ''
  const currentSort = searchParams.get('sort') || ''

  // builds a new URL with the given category + sort, then navigates there
  function goToProducts(category, sort) {
    const params = new URLSearchParams()
    if (category) params.set('category', category)
    if (sort) params.set('sort', sort)
    navigate(`/products?${params.toString()}`)
  }

  function handleCategoryChange(e) {
    goToProducts(e.target.value, currentSort)
  }

  function handleSortChange(e) {
    goToProducts(currentCategory, e.target.value)
  }

  return (
    <aside className="w-56 shrink-0 border-r border-gray-200 p-5 min-h-screen">
      <h2 className="text-xs font-semibold uppercase text-gray-400 mb-4 tracking-wide">
        Browse
      </h2>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Category</label>
        <select
          value={currentCategory}
          onChange={handleCategoryChange}
          className="w-full border border-gray-300 rounded-md p-2 text-sm bg-white"
        >
          <option value="">All Categories</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Sort By</label>
        <select
          value={currentSort}
          onChange={handleSortChange}
          className="w-full border border-gray-300 rounded-md p-2 text-sm bg-white"
        >
          <option value="">Default</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="newest">Newest First</option>
        </select>
      </div>
    </aside>
  )
}

export default Sidebar