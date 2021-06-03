const express = require('express')
const router = express.Router()
const verify = require('../../verifyToken')

const controller = require('./user.controller');


router.get('/', controller.index)

router.get('/token', verify, controller.getById)

router.post('/register', controller.create)

router.post('/login', controller.login)

router.post('/createNewProfile', verify ,controller.createNewProfile)



module.exports = router