const mongoose = require ('mongoose');
const Joi = require('joi');

const genreSchema = new mongoose.Schema({
    name : {
    type:String,
    required: true,
    minlength: 5,
    maxlength: 50
    }
});

const Genre =  mongoose.model('Genre', genreSchema);

function validateGenre(genre){
    const schema= Joi.object({
        name: Joi.string().min(3).required()
    });
    const {error} = schema.validate(genre);
    return {error};
}


module.exports.Genre = Genre;
module.exports.validate = validateGenre;
module.exports.genreSchema= genreSchema;