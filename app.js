const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')

dotenv.config();


app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.json())

const productRouter = require('./api/product/index')
const userRouter = require('./api/user/index')
const orderRouter = require('./api/order/index')
const discountRouter = require('./api/discount/index')


app.use(cors())
app.use('/products', productRouter)
app.use('/users', userRouter)
app.use('/orders', orderRouter)
app.use('/discounts', discountRouter)


mongoose.connect(process.env.DB_CONNECT,{ useNewUrlParser: true, useUnifiedTopology: true })

app.get('/',(req,res) =>{   
    res.send('here we are ~');
});



app.listen(3000)