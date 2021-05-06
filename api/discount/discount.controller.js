
const Discount = require('./discount.model')


exports.index = async (req,res) =>{
    await Discount.find({}).then(response =>{
        res.send(response)
    }).catch(err=>{
        console.log(err);
    })
}

exports.getById = async (req,res) =>{
    await Discount.find({_id: req.params.id}).then((result)=>{
        res.json(result)
    }).catch(err=>{
        console.log(err);
    })
}

exports.create = async (req, res) =>{
    await Discount.create(req.body).then((result)=>{
        res.json(result)
    }).catch((err)=>{
        console.log(err)
    })
}