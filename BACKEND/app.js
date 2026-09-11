require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');


app.use(cors());
app.use(express.json()) ;// lets Express parse JSON request bodies

const productRoutes = require('./routes/products')
const authRoutes = require('./routes/auth')
const cartRoutes = require('./routes/cart')
const orderRoutes=require('./routes/orders')
const webhookRoutes = require('./routes/webhooks')
const userRoutes = require('./routes/users')

// Middleware


app.use('/api/products', productRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/webhooks', webhookRoutes)
app.use('/api/users', userRoutes)

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err))

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'SoundHouse API running' })
})



const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

