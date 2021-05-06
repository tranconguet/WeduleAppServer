const mongoose = require('mongoose');
const verify = require('../../verifyToken')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('./user.model')

const {registerValidation, loginValidation} = require('../../validation');
const { json } = require('body-parser');

exports.index = async (req,res) =>{
    await User.find({}).then(response => {
        res.send(response)
    })
}

exports.getById = async (req,res)=>{
    verify(req, res, async () =>{
        const id = req.user._id
        await User.find({_id: id}).then((result)=>{
            res.json(result)
        })
    })
}

exports.updateById = async (req,res)=>{
    var userId = new mongoose.mongo.ObjectId(req.params.id);

    const data = {
        userName: req.body.userName,
        birthday: req.body.birthday,
        gender: req.body.gender,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        cart: JSON.parse(req.body.cart),
        locations: JSON.parse(req.body.locations),
        loves: JSON.parse(req.body.loves),
    }
    console.log(data)
    await User.updateOne({_id: userId},{$set: data},()=>{
            console.log(req.body)
            res.send('ok!')
    })
}

exports.create = async (req,res) => {

    //validate
    const {error} = registerValidation(req.body)
    if(error) return res.status(203).send(error.details[0].message)

    // //check if userName exist 
    // const userNameExist = await User.findOne({userName: req.body.userName});
    // if(userNameExist) return res.status(201).send('userName already exists')

    //check if Email exist
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(202).send('email already exists')

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // create new user
    const user = new User({
        ...req.body, 
        password: hashedPassword
    })
    try{
        const savedUser = await user.save();
        res.send({user: user._id})
    }catch(err){
        res.status(400).send(err);
    }
}

exports.login = async (req,res) => {

    //validate
    console.log(req.body);
    const {error} = loginValidation(req.body)
    if(error) return res.status(201).send(error.details[0].message)

    //check if email exist 
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(201).send('email is wrong')
    //check if password correct
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(201).send('password is wrong')
    // create and assign a token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);

}

