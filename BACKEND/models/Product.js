const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    audioSample: {
        type: String, // URL to an audio file (e.g. hosted on Cloudinary, or later self-hosted)
        default: null,
    },
    category: {
        type: String,
        required: true,
        enum: ['Guitars', 'Keyboards', 'Drums', 'Strings', 'Wind', 'Amps & Pedals', 'Accessories'],
    },
    brand: {
        type: String,
        required: true,
    },
    sku: {
        type: String,
        required: true,
        unique: true,
    },
    stock: {
        type: Number,
        required: true,
        default: 0,
    },
    images: {
        type: [String],
        default: [],
    },
    specs: {
        type: mongoose.Schema.Types.Mixed,
        default: {},
    },
}, {
    timestamps: true,
})

module.exports = mongoose.model('Product', productSchema)