const Product = require('./product.model')
const mongoose = require('mongoose');


exports.index = async (req,res) =>{
    await Product.find({}).then(response =>{
        res.send(response)
    }).catch(err=>{
        console.log(err);
    })
}


exports.getProducts = (type) => {
    switch(type){
        case 'phones':
            return async (req,res) =>{
                await Product.find({type: 'Phone'}).then(response =>{
                    res.send(response)
                }).catch(err=>{
                    console.log(err);
                })
            }
        case 'acs':
            return async (req,res) =>{
                await Product.find({type: 'Accessories'}).then(response =>{
                    res.send(response)
                }).catch(err=>{
                    console.log(err);
                })
            }
        case 'watches':
            return async (req,res) =>{
                await Product.find({type: 'Watch'}).then(response =>{
                    res.send(response)
                }).catch(err=>{
                    console.log(err);
                })
            }
        case 'tablets':
            return async (req,res) =>{
                await Product.find({type: 'Tablet'}).then(response =>{
                    res.send(response)
                }).catch(err=>{
                    console.log(err);
                })
            }
        case 'laptops': 
            return async (req,res) =>{
                await Product.find({type: 'Laptop'}).then(response =>{
                    res.send(response)
                }).catch(err=>{
                    console.log(err);
                })
            }
    }
}

exports.getProductById = async (req,res) =>{
    var productId = new mongoose.mongo.ObjectId(req.params.id);

    await Product.find({_id: productId}).then(response =>{
        res.send(response)
    }).catch(err=>{
        console.log(err);
    })
}

exports.getProductBySearching = async (req,res) =>{
    var text = req.params.text;

    await Product.find({}).then(response =>{
        var results = response.filter(el => el.title.search(text) >= 0)
        res.send(results)
    }).catch(err=>{
        console.log(err);
    })
}