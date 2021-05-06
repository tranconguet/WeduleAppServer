const express = require('express')

const router = express.Router()

const controller = require('./discount.controller')

router.get('/', controller.index)

router.get('/:id', controller.getById)

router.post('/', controller.create)

module.exports = router
