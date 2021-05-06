const mongoose = require('mongoose')
const Schema = mongoose.Schema

  
var DiscountSchema = new Schema({
    name: { type: String, required: true },
    type:  {type: String, required: true },// shipping discount, percent total discount, value discount 
    value: {type: String, required: true},
    startDate: {type: String, required: true },
    expiryDate: {type: String, required: true },
})

module.exports = mongoose.model('Discount', DiscountSchema, 'discounts')

