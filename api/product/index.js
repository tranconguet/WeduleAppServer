const express = require('express')

const router = express.Router()

const controller = require('./product.controller')


router.get('/', controller.index)

router.get('/phones', controller.getProducts('phones'))

router.get('/acs', controller.getProducts('acs'))

router.get('/watches', controller.getProducts('watches'))

router.get('/tablets', controller.getProducts('tablets'))

router.get('/laptops', controller.getProducts('laptops'))

router.get('/search/:text', controller.getProductBySearching)

router.get('/:id', controller.getProductById)



module.exports = router