const {User, validate} = require ('../models/user');
const mongoose = require ('mongoose');
//const Joi = require('joi');
const express = require('express');
const router = express.Router()
router.use(express.json());

router.post('/', async (req, res) => {
    const {error} =  validate(req.body);
    console.log(error);
    if(error)
    return res.status(404).send(error.details[0].message);
   
    let user = await User.findOne({email : req.body.email});
    if(user)
    return res.status(400).send('User Email is registered. Use a different Email address')
    user = new User( 
      {
          name : req.body.name,
          email: req.body.email,
          password: req.body.password
        });
     await user.save();
       
     res.send({
       name:  user.name,
        email: user.email
     });
    });
    
    
    
    module.exports = router;