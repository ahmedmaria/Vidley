const {Customer, validate} = require ('../models/customer');
const mongoose = require ('mongoose');
const Joi = require('joi');
const express = require('express');

const router = express.Router()
router.use(express.json());



router.get('/', async (req, res) => {
    const customers = await  Customer.find().sort('name');
    res.send(customers);
    });
  
 router.post ('/', async (req, res) => {
    const {error} =  validate(req.body);
        console.log(error);
        if(error)
        return res.status(404).send(error.details[0].message);
    
      let  customer = new Customer( {
          isGold : req.body.isGold,
           name : req.body.name , 
           phone : req.body.phone
        });
    customer = customer.save();
           
         res.send(customer);
           });

 router.get('/:id', async (req, res) => {

    const customer = await Customer.findById(req.params.id);
            if(!customer)
            return res.status(400).send('Customer with given ID was not fond');
            res.send(customer);
             });

 router.put('/:id', async (req,res) => {
    const {error} =  validate(req.body);
    if(error)
     return res.status(404).send(error);
        
    const customer = await Customer.findByIdAndUpdate(req.params.id ,
        {
            isGold : req.body.isGold,
           name : req.body.name , 
           phone : req.body.phone
        } , { new: true} );
    if(!customer)
    return res.status(400).send('Customer not fond');
               
     res.send(customer);
            });

router.delete('/:id', async (req,res) => {
    const customer= await Customer.findByIdAndRemove(req.params.id);
    if(!customer)
    return res.status(400).send('ID not fond');        
     res.send(customer);
     });



    module.exports = router;