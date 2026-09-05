const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
const { protect, adminOnly } = require('../middleware/auth')

// GET /api/products — fetch all products, with optional filter + sort
// Example: /api/products?category=Guitars&sort=price_asc
router.get('/', async (req, res) => {
  try {
    const { category, sort } = req.query

    // build the filter object — only add category if one was given
    const filter = {}
    if (category) {
      filter.category = category
    }

    // start the query, apply filter
    let query = Product.find(filter)

    // apply sorting based on the sort value
    if (sort === 'price_asc') {
      query = query.sort({ price: 1 })   // low to high
    } else if (sort === 'price_desc') {
      query = query.sort({ price: -1 })  // high to low
    } else if (sort === 'newest') {
      query = query.sort({ createdAt: -1 }) // newest first
    }

    const products = await query
    res.json(products)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message })
  }
})

// GET /api/products/:id — fetch one product by its ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.json(product)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error: error.message })
  }
})

// POST /api/products — create a new product
router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const newProduct = new Product(req.body)
    const savedProduct = await newProduct.save()
    res.status(201).json(savedProduct)
  } catch (error) {
    res.status(400).json({ message: 'Error creating product', error: error.message })
  }
})

// PUT /api/products/:id — update an existing product
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.json(updatedProduct)
  } catch (error) {
    res.status(400).json({ message: 'Error updating product', error: error.message })
  }
})

// DELETE /api/products/:id — remove a product
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id)
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.json({ message: 'Product deleted successfully', product: deletedProduct })
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message })
  }
})

module.exports = router