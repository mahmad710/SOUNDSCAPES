const express = require('express')
const router = express.Router()
const Cart = require('../models/Cart')
const { protect } = require('../middleware/auth')

// GET /api/cart — get the logged-in user's cart
router.get('/', protect, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id }).populate('items.product')

    if (!cart) {
      // if the user has no cart yet, create an empty one
      cart = await Cart.create({ user: req.user.id, items: [] })
    }

    res.json(cart)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart', error: error.message })
  }
})

// POST /api/cart/items — add an item to the cart
router.post('/items', protect, async (req, res) => {
  try {
    const { productId, quantity } = req.body

    let cart = await Cart.findOne({ user: req.user.id })

    if (!cart) {
      cart = await Cart.create({ user: req.user.id, items: [] })
    }

    // check if this product is already in the cart
    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    )

    if (existingItem) {
      // already in cart — just increase the quantity
      existingItem.quantity += quantity || 1
    } else {
      // not in cart yet — add it as a new item
      cart.items.push({ product: productId, quantity: quantity || 1 })
    }

    await cart.save()
    const populatedCart = await cart.populate('items.product')
    res.json(populatedCart)
  } catch (error) {
    res.status(400).json({ message: 'Error adding item to cart', error: error.message })
  }
})

// PATCH /api/cart/items/:itemId — update quantity of a specific item
router.patch('/items/:itemId', protect, async (req, res) => {
  try {
    const { quantity } = req.body

    const cart = await Cart.findOne({ user: req.user.id })
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' })
    }

    const item = cart.items.id(req.params.itemId)
    if (!item) {
      return res.status(404).json({ message: 'Item not found in cart' })
    }

    item.quantity = quantity
    await cart.save()
    const populatedCart = await cart.populate('items.product')
    res.json(populatedCart)
  } catch (error) {
    res.status(400).json({ message: 'Error updating cart item', error: error.message })
  }
})

// DELETE /api/cart/items/:itemId — remove an item from the cart
router.delete('/items/:itemId', protect, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id })
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' })
    }

    cart.items = cart.items.filter(
      (item) => item._id.toString() !== req.params.itemId
    )

    await cart.save()
    const populatedCart = await cart.populate('items.product')
    res.json(populatedCart)
  } catch (error) {
    res.status(500).json({ message: 'Error removing cart item', error: error.message })
  }
})

module.exports = router