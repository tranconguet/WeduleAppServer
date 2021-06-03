const express = require('express')
const router = express.Router()
const verify = require('../../verifyToken')


const controller = require('./events.controller');


router.get('/', verify, controller.index)

router.get('/id', verify, controller.getById)

router.post('/getByProfileName', verify, controller.getByProfileName)

router.post('/updateEventList', verify, controller.updateEventList)



module.exports = router