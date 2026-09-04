const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

// POST /api/auth/register — create a new user account
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body

        // check if a user with this email already exists
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' })
        }

        // hash the password before saving — never store plain text
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        })

        const savedUser = await newUser.save()

        // don't send the password hash back in the response
        res.status(201).json({
            _id: savedUser._id,
            name: savedUser.name,
            email: savedUser.email,
            role: savedUser.role,
        })
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error: error.message })
    }
})

// POST /api/auth/login — authenticate a user and issue a token
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body

        // find the user by email
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' })
        }

        // compare the typed password against the stored hash
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' })
        }

        // create a JWT containing the user's id and role
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )

        res.json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        })
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message })
    }
})

module.exports = router