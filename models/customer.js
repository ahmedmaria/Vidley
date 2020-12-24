const mongoose = require('mongoose');
const Joi = require('joi');



const customerSchema = new mongoose.Schema({
    isGold: {
        type: Boolean,
        default : false
    } ,
    name : {
    type:String,
    required: true,
    min: 5,
    max : 50
    },
    phone : {
        type:String,
        required: true,
    } 
});

const Customer =  mongoose.model('Customer', customerSchema);


function validateCustomer(customer){
                
    const schema= Joi.object({
        name: Joi.string().min(5).required(),
       phone : Joi.string().min(10).required(),
       isGold: Joi.boolean()
         });
     const {error} = schema.validate(customer);
        return {error};
        };

module.exports.Customer = Customer;
module.exports.validate = validateCustomer;