const {User} = require ('../models/user');
const Joi = require('joi');
const bcrypt = require ('bcrypt');
const mongoose = require ('mongoose');
const express = require('express');
const router = express.Router()
router.use(express.json());

router.post('/', async (req, res) => {
    const {error} =  validate(req.body);
    console.log(error);
    if(error)
    return res.status(404).send(error.details[0].message);
   
    let user = await User.findOne({email : req.body.email});
    if(!user)
    return res.status(400).send('Invalid email or password');
   //------compare hashed password with plain text password------------

   const validPassword = await bcrypt.compare(req.body.password, user.password);
   if(!validPassword)
   return res.status(400).send('Invalid email or password');

   res.send(true);

     
    });
    
    async function validate(req){
      
        const schema = JOi.object({
            email : Joi.String().min(3).max(255).email().required(),
            password : Joi.String().min(5).max(1024).required()
        })
        const {error} = schema.validate(req);
        return {error};

    }
    
    module.exports = router;