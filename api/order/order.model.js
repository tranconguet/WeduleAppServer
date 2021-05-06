const mongoose = require('mongoose')
const Schema = mongoose.Schema

var OrderDetailsSchema = new Schema({
    productId: { type: String, required: true },
    quantity: Number
})
  

var LocationSchema = new Schema({
    receiverName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
    length: {type: Number, required: true},
})

var OrderSchema = new Schema({
    // buyer details
    // name: String,
    user: { type: String, required: true },
    shippingAddress:  {type: LocationSchema, required: true },
    items: [OrderDetailsSchema],
    shipping: {type: String, required: true},
    text: {type: String, required: false},
    // tax: {type: Number},
    discount: {type: String, default: "0 %"},
    subTotal: {type: String},
    total: {type: String, required: true},
    // payment info
    status: { type: String, default: 'pending' }, // pending, paid/failed, delivered, canceled, refunded.
    // paymentType: { type: String, default: 'braintree' },
    // paymentStatus: Schema.Types.Mixed,
    // type: String
})

module.exports = mongoose.model('Order', OrderSchema, 'orders')

