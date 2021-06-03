const Joi = require('@hapi/joi');


const registerValidation = (data) => {
    const schema = Joi.object({
        userName: Joi.string().min(4).required(true),
        password: Joi.string().min(6).required(true),
    })
    return schema.validate(data);
}

const loginValidation = (data) => {
    const schema = Joi.object({
        userName: Joi.string().min(4).required(true),
        password: Joi.string().min(6).required(true),
    })
    return schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;