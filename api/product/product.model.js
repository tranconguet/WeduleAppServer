
const mongoose = require('mongoose');

const ProductsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    images: { type: Array, required: false }, 
    description: { type: String, required: true }, 
    price: { type: String, required: true }, 
    type: { type: String, required: true }, 
    rating: { type: Number, required: true },
})

module.exports = mongoose.model('Products', ProductsSchema, 'products');