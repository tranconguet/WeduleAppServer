const e = require('express');
const Order = require('./order.model')


exports.index = async (req,res) =>{
    await Order.find({}).then(response =>{
        res.send(response)
    }).catch(err=>{
        console.log(err);
    })
}

exports.getById = async (req,res) =>{
    await Order.find({_id: req.params.id}).then((result)=>{
        res.json(result)
    }).catch(err=>{
        console.log(err);
    })
}

exports.create = async (req, res) =>{
    var data = req.body;
    data.shippingAddress = JSON.parse(req.body.shippingAddress)
    data.items = JSON.parse(data.items)
    console.log(data)
    await Order.create(data).then((result)=>{
        res.json(result)
    }).catch((err)=>{
        console.log(err)
    })
}