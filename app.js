const express = require('express');
const app = express();
const tourRouter = require('./routes/tours.route');
const userRouter = require('./routes/users.route');
const morgan = require('morgan'); 
const dotenv = require('dotenv')



// Static middleware ->
app.use(express.static(`${__dirname}/public`))
// Morgan middle ware ->
app.use(morgan('dev'));
// Router middleware
app.use('/tour', tourRouter);
app.use('/users', userRouter);


module.exports = app;


