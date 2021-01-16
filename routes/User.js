const {User, validate} = require ('../models/user');
const auth = require('../middleware/auth');
const _ = require('lodash');
const config = require('config');
const jwt = require ('jsonwebtoken');
const bcrypt = require ('bcrypt');
const mongoose = require ('mongoose');
//const Joi = require('joi');
const express = require('express');
const router = express.Router()
router.use(express.json());
// using /me instead of /:id so that one user can not see other users data
router.get('/me', auth, async(req,res) =>{
const user = await User.findById(req.user._id).select('-password');
res.send(user);
});


router.post('/', async (req, res) => {
    const {error} =  validate(req.body);
    console.log(error);
    if(error)
    return res.status(404).send(error.details[0].message);
   
    let user = await User.findOne({email : req.body.email});
    if(user)
    return res.status(400).send('User Email is registered. Use a different Email address');
   // with lodash
   user = new User(_.pick(req.body , ['name', 'email', 'password']));
   //------hashing user password-------
   const salt = await bcrypt.genSalt(5);
   user.password = await bcrypt.hash(user.password, salt);

    // user = new User( 
    //   {
    //       name : req.body.name,
    //       email: req.body.email,
    //       password: req.body.password
    //     });
     await user.save();
     // with lodash
     const token = user.generateAuthToken();
     //const token =  jwt.sign({_id: user._id}, config.get('jwtPrivateKey')); 
     res.header('x-auth-token', token).send(_.pick(user, ['id','name', 'email']));
       
    //  res.send({
    //    name:  user.name,
    //     email: user.email
    //  });
    });
    
    
    
    module.exports = router;