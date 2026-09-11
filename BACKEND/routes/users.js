const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { protect, adminOnly } = require('../middleware/auth')

// GET /api/users — list all users (admin only)
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const users = await User.find().select('-password')
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message })
  }
})

// PATCH /api/users/:id/role — change a user's role (admin only)
router.patch('/:id/role', protect, adminOnly, async (req, res) => {
  try {
    const { role } = req.body
    if (!['customer', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' })
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true, runValidators: true }
    ).select('-password')

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json(user)
  } catch (error) {
    res.status(400).json({ message: 'Error updating role', error: error.message })
  }
})

module.exports = router