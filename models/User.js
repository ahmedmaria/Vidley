const mongoose = require ('mongoose');
const Joi = require('joi');
const jwt = require ('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
    name : {
    type:String,
    required: true,
    minlength: 5,
    maxlength: 50
    },
    email: {
    type: String,
    minlength: 5,
    maxlength: 255,
    unique: true
    },
    password : {
        type: String,
        minlength: 5,
        maxlength: 1024,
        
    }
});

// adding auth token function
userSchema.methods.generateAuthToken = function(){
    const token =  jwt.sign({_id: this._id}, config.get('jwtPrivateKey')); 
}

const User =  mongoose.model('User', userSchema);

function validateUser(user){
    const schema= Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(1024).required(),
    });
    const {error} = schema.validate(user);
    return {error};
}


module.exports.User = User;
module.exports.validate = validateUser;
module.exports.userSchema= userSchema;