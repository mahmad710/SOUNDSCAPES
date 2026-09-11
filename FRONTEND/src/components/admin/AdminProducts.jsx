import { useEffect, useState } from 'react'
import { getProducts, createProduct, updateProduct, deleteProduct } from '../../api/products'
import { useAuth } from '../../context/AuthContext'

const CATEGORIES = ['Guitars', 'Keyboards', 'Drums', 'Strings', 'Wind', 'Amps & Pedals', 'Accessories']

const EMPTY_FORM = {
  name: '', description: '', price: '', category: CATEGORIES[0],
  brand: '', sku: '', stock: '', images: '',
}

function AdminProducts() {
  const { token } = useAuth()
  const [products, setProducts] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [showForm, setShowForm] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    loadProducts()
  }, [])

  function loadProducts() {
    getProducts().then(setProducts).catch((err) => console.error(err))
  }

  function startEdit(product) {
    setEditingId(product._id)
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      brand: product.brand,
      sku: product.sku,
      stock: product.stock,
      images: (product.images || []).join(', '),
    })
    setShowForm(true)
  }

  function startNew() {
    setEditingId(null)
    setForm(EMPTY_FORM)
    setShowForm(true)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    const payload = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
      images: form.images.split(',').map((url) => url.trim()).filter(Boolean),
    }

    try {
      if (editingId) {
        await updateProduct(editingId, payload, token)
      } else {
        await createProduct(payload, token)
      }
      setShowForm(false)
      loadProducts()
    } catch (err) {
      setError(err.message)
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this product?')) return
    await deleteProduct(id, token)
    loadProducts()
  }

  return (
    <div>
      <button
        onClick={startNew}
        className="mb-6 bg-black text-white px-5 py-2 rounded-full text-sm hover:bg-gray-800 transition-colors"
      >
        + Add Product
      </button>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-6 mb-8 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
            required
          />
          <input
            placeholder="Brand"
            value={form.brand}
            onChange={(e) => setForm({ ...form, brand: e.target.value })}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
            required
          />
          <input
            placeholder="SKU"
            value={form.sku}
            onChange={(e) => setForm({ ...form, sku: e.target.value })}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
            required
          />
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Price (PKR)"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
            required
          />
          <input
            type="number"
            placeholder="Stock"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
            required
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm md:col-span-2"
            rows={3}
            required
          />
          <input
            placeholder="Image URL(s), comma separated"
            value={form.images}
            onChange={(e) => setForm({ ...form, images: e.target.value })}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm md:col-span-2"
          />

          {error && <p className="text-red-500 text-sm md:col-span-2">{error}</p>}

          <div className="flex gap-3 md:col-span-2">
            <button
              type="submit"
              className="bg-black text-white px-5 py-2 rounded-full text-sm hover:bg-gray-800 transition-colors"
            >
              {editingId ? 'Save Changes' : 'Create Product'}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="text-gray-400 text-sm hover:text-black transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="flex flex-col gap-2">
        {products.map((product) => (
          <div
            key={product._id}
            className="flex items-center justify-between bg-white/60 backdrop-blur-xl border border-white/40 rounded-xl px-4 py-3"
          >
            <div>
              <p className="font-medium text-sm">{product.name}</p>
              <p className="text-xs text-gray-400">
                {product.sku} · Rs {product.price} · Stock: {product.stock}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => startEdit(product)}
                className="text-sm text-gray-500 hover:text-black transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product._id)}
                className="text-sm text-red-400 hover:text-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminProducts