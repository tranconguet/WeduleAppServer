const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
var port = process.env.PORT || 3000
dotenv.config();


app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.json())


const userRouter = require('./api/user/index')
const eventRouter = require('./api/events/index')

app.use(cors())
app.use('/users', userRouter)
app.use('/events', eventRouter)


mongoose.connect(process.env.DB_CONNECT,{ useNewUrlParser: true, useUnifiedTopology: true })

app.get('/',(req,res) =>{   
    res.send('here we go ~');
});


app.listen(port)