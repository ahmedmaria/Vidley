const {Genre, validate} = require ('../models/genre');
const mongoose = require ('mongoose');
//const Joi = require('joi');
const express = require('express');
const router = express.Router()
router.use(express.json());



router.get('/', async (req, res) => {
const genres = await Genre.find().sort('name'); // Genre.find().sort('name');
res.send(genres);
});

router.post ('/', async (req, res) => {
    const {error} =  validate(req.body);
    console.log(error);
    if(error)
    return res.status(404).send(error.details[0].message);

  let  genre = new Genre( {name : req.body.name});
     genre= genre.save();
       
     res.send(genre);
       });

router.get('/:id', async (req, res) => {

   const genre= await Genre.findById(req.params.id);
   if(!genre)
   return res.status(400).send('Genre with given ID was not fond');
   res.send(genre);
    });

  
router.put('/:id', async (req,res) => {
    const {error} =  validate(req.body);
    if(error)
    return res.status(404).send(error);

    const genre = await Genre.findByIdAndUpdate(req.params.id ,{name : req.body.name} , {
        new: true
    } )
    if(!genre)
    return res.status(400).send('Genre not fond');
   
    res.send(genre);
});

router.delete('/:id', async (req,res) => {
    const genre= await Genre.findByIdAndRemove(req.params.id);
    if(!genre)
    return res.status(400).send('ID not fond');
 
 res.send(genre);
});

module.exports = router;
