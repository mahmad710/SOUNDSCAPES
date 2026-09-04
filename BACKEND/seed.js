require('dotenv').config()
const mongoose = require('mongoose')
const Product = require('./models/Product')

const sampleProducts = [
  {
    name: 'Fender Stratocaster',
    description: 'Classic electric guitar with versatile tone, iconic since 1954.',
    price: 899.99,
    category: 'Guitars',
    brand: 'Fender',
    sku: 'GTR-FEN-STRAT-001',
    stock: 12,
    images: [],
    audioSample: null,
    specs: { bodyWood: 'Alder', strings: 6, pickups: 'Single-coil x3' },
  },
  {
    name: 'Yamaha P-125 Digital Piano',
    description: '88-key weighted digital piano, great for beginners and stage use.',
    price: 649.99,
    category: 'Keyboards',
    brand: 'Yamaha',
    sku: 'KEY-YAM-P125-001',
    stock: 8,
    images: [],
    audioSample: null,
    specs: { keys: 88, weighted: true, polyphony: 192 },
  },
  {
    name: 'Pearl Export Series Drum Kit',
    description: '5-piece drum kit, great all-around beginner-to-intermediate set.',
    price: 799.99,
    category: 'Drums',
    brand: 'Pearl',
    sku: 'DRM-PRL-EXPORT-001',
    stock: 5,
    images: [],
    audioSample: null,
    specs: { pieces: 5, shellMaterial: 'Poplar/Asian Mahogany' },
  },
  {
    name: "D'Addario EXL110 Electric Guitar Strings",
    description: 'Nickel wound, regular light gauge, the industry standard string set.',
    price: 6.99,
    category: 'Strings',
    brand: "D'Addario",
    sku: 'STR-DAD-EXL110-001',
    stock: 100,
    images: [],
    audioSample: null,
    specs: { gauge: '10-46', material: 'Nickel-plated steel' },
  },
]

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('MongoDB connected for seeding')

    await Product.deleteMany({})
    console.log('Old products cleared')

    await Product.insertMany(sampleProducts)
    console.log(`${sampleProducts.length} products seeded successfully`)

    process.exit(0)
  } catch (error) {
    console.error('Seeding error:', error)
    process.exit(1)
  }
}

seedDatabase()