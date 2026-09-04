const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/auth')
const Cart = require('../models/Cart')
const Order = require('../models/Order')
const safepay = require('../utils/safepay')

router.post('/', protect, async (req, res) => {
  try {
    // Step 1: find this user's cart, and get real product data (name/price)
    const cart = await Cart.findOne({ user: req.user.id }).populate('items.product')
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' })
    }

    // Step 2: convert cart items -> order items (snapshot name/price)
    const orderItems = cart.items.map((item) => ({
      product: item.product._id,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
    }))

    // Step 3: calculate total
    const total = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

    // Step 4: create the order
    const order = new Order({
      user: req.user.id,
      items: orderItems,
      shippingAddress: req.body.shippingAddress,
      total,
    })
    await order.save()

    // Step 5: clear the cart now that the order exists
    cart.items = []
    await cart.save()

    // Step 6: create a Safepay payment token
    const { token } = await safepay.payments.create({
      amount: total , // rupees -> paisa
      currency: 'PKR',
    })

    // Step 7: create the checkout link using that token
    const checkoutUrl = safepay.checkout.create({
      token,
      orderId: order._id.toString(),
      cancelUrl: 'http://localhost:5173/cancel',
      redirectUrl: 'http://localhost:5173/success',
      source: 'custom',
      webhooks: true,
    })

    // Step 8: save the token on the order for later reference
    order.safepayToken = token
    await order.save()

    // Step 9: send order + payment link back
    res.status(201).json({ order, checkoutUrl })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router