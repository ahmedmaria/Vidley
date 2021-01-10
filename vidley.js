const mongoose = require ('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const genres = require('./routes/genres')
const customers = require('./routes/customers')
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const express = require('express');

const app = express();

mongoose.connect("mongodb://localhost/vidley", { useNewUrlParser: true , useUnifiedTopology: true } )
.then(()=> console.log('Connected to MongoDB(vidley)...'))
.catch(err => console.error('Could not connect to MongoDB(vidley)...'))

// mongoose.connect("mongodb://localhost/customers", { useNewUrlParser: true , useUnifiedTopology: true } )
// .then(()=> console.log('Connected to MongoDB(customers)...'))
// .catch(err => console.error('Could not connect to MongoDB(customers)...'))

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);



app.listen(3000, () =>{
    console.log('Listening to port 3000 ....')
})