const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    productId: {type: String, required: false},
    quantity: {type: Number, required: false},
    isChosen: {type: Boolean, required: false}
})

const LocationSchema = new mongoose.Schema({
    receiverName: {type: String, required: false},
    phoneNumber: {type: String, required: false},
    address: {type: String, required: false},
    length: {type: Number, required: true},
})

const UserSchema = new mongoose.Schema({
    userName: {type: String, required: false},
    password: {type: String, required: true},
    email: {type: String, required: true},
    address: {type: String, required: false},
    phoneNumber: {type: String, required: false},
    gender: {type: String, required: false},
    cart: [ItemSchema],
    locations: [LocationSchema],
    loves: {type: Array, required: false},
    birthday: {type: String, required: false},
})

module.exports = mongoose.model('User', UserSchema, 'users');