const express = require('express')
const router = express.Router()
const safepay = require('../utils/safepay')
const Order = require('../models/Order')

router.post('/safepay', async (req, res) => {
  try {
    const valid = await safepay.verify.webhook(req)

    if (!valid) {
      return res.status(401).json({ message: 'Invalid webhook signature' })
    }

    const { notification } = req.body.data

    if (notification.state === 'PAID') {
      const orderId = notification.metadata.order_id

      await Order.findByIdAndUpdate(orderId, {
        paymentStatus: 'paid',
        status: 'paid',
      })
    }

    res.status(200).json({ received: true })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router