const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    profileName: {type: String, required: true},
    lastAccess: {type: String, required: true, default: ''},
})

const UserSchema = new mongoose.Schema({
    userName: {type: String, required: true},
    password: {type: String, required: true},
    profiles: [ProfileSchema]
})



module.exports = mongoose.model('User', UserSchema, 'users');